import { Flex, Box, VStack, SimpleGrid, GridItem, Button, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { InputField } from "../../components/InputField";
import Layout from "../../components/Layout";
import { useUpdateItemMutation } from "../../generated/graphql";
import { useGetItemFromUrl } from "../../utils/getItemFromUrl";

const InventoryItemPage: NextPage = () => {
  const router = useRouter();
  const toast = useToast()

  const [{ data, fetching }] = useGetItemFromUrl();
  const [, updateItem] = useUpdateItemMutation();

  if (fetching) {
    return (
      <Layout>
        <h1>
          Loading...
        </h1>
      </Layout>
    )
  }

  return (
    <Layout>
      <Flex w='100%'>
        <Box p="2" w='100%'>
          <VStack w="full" spacing={10} alignItems="flex-start">
            <SimpleGrid columns={4} columnGap={3} rowGap={6} >
              <Formik
                initialValues={{
                  id: data?.getItem.id,
                  name: data?.getItem.name,
                  description: data?.getItem.description,
                  quantity: data?.getItem.quantity,
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  console.log("Updated Item")
                  console.log(values)
                  await updateItem({
                    itemId: parseInt(values.id as string),
                    name: values.name || "",
                    description: values.description || "",
                    quantity: values.quantity || 0,
                  })
                  setSubmitting(false);
                  toast({
                    title: "Success",
                    description: "Item updated successfully",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  })
                  router.back();
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <GridItem colSpan={1}>
                      <InputField
                        name="id"
                        placeholder="ID"
                        readOnly
                        label="ID"
                        type="number"
                      />
                    </GridItem>
                    <GridItem colSpan={1}>
                      <InputField
                        name="name"
                        placeholder="Name"
                        label="Name"
                        type="text"
                      />
                    </GridItem>
                    <GridItem colSpan={1}>
                      <InputField
                        name="description"
                        placeholder="Description"
                        label="Description"
                        type="text"
                      />
                    </GridItem>
                    <GridItem colSpan={1}>
                      <InputField
                        name="quantity"
                        placeholder="Quantity"
                        label="Quantity"
                        type="number"
                      />
                    </GridItem>
                    <Box pt={4}>
                      <Button
                        colorScheme={'blue'}
                        mr={4}
                        type="submit"
                        isLoading={isSubmitting}
                      >
                        Save
                      </Button>
                      <Button
                        colorScheme={'gray'}
                        onClick={() => {
                          router.back();
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </SimpleGrid>
          </VStack>
        </Box>
      </Flex>
    </Layout>
  );
}

export default InventoryItemPage;