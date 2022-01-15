import { Flex, useToast, Heading, Button, ButtonGroup } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { CheckboxContainer, CheckboxControl, SubmitButton } from "formik-chakra-ui";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useExportDataMutation } from "../../generated/graphql";

const ExportItemPage: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const [, exportData] = useExportDataMutation();

  return (
    <Layout>
      <Flex w='100%' direction={"column"}>
        <Flex direction={"column"}>
          <Heading mb={4}>Export Inventory</Heading>
          <Heading size={"xs"} mb={4}>Select the fields to export in order you'd like them displayed. If none are selected, all fields will be exported.</Heading>
        </Flex>
        <Formik initialValues={{ fields: ["id"] }}
          onSubmit={async (values, { setSubmitting }) => {
            console.log("Submitted")
            const response = await exportData({
              fields: values.fields,
            })

            toast({
              title: "Success",
              description: "Inventory has been exported to a CSV file. Downloading now",
              status: "success",
              duration: 9000,
              isClosable: true,
            })

            const url = response.data?.exportData.url;
            window.location.href = url as string;
          }}
        >
          <Form>
            <CheckboxContainer name="fields">
              <CheckboxControl name="fields" value="id">
                ID
              </CheckboxControl>
              <CheckboxControl name="fields" value="name">
                Name
              </CheckboxControl>
              <CheckboxControl name="fields" value="description">
                Description
              </CheckboxControl>
              <CheckboxControl name="fields" value="quantity">
                Quantity
              </CheckboxControl>
            </CheckboxContainer>
            <ButtonGroup mt={4}>
              <SubmitButton colorScheme={"blue"}>
                Export
              </SubmitButton>
              <Button
                colorScheme={'gray'}
                onClick={() => {
                  router.back();
                }}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </Form>
        </Formik>
      </Flex>
    </Layout>
  );
}

export default ExportItemPage;