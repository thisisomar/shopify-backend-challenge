import { Flex, Box, VStack, SimpleGrid, GridItem, Button, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { InputField } from "../../components/InputField";
import Layout from "../../components/Layout";
import { useCreateItemMutation } from "../../generated/graphql";
import { ItemSchema } from "../../utils/validatonSchemas";

const CreateInventoryItemPage: NextPage = () => {
  const [, createItem]  = useCreateItemMutation();

  const router = useRouter();
  const toast = useToast();

  return (
    <Layout>
      <Flex w='100%'>
        <Box p="2" w='100%'>  
        <VStack w="full" spacing={10} alignItems="flex-start">
            <SimpleGrid columns={4} columnGap={3} rowGap={6} >
              <Formik
                initialValues={{name: "", description: "", quantity: "",
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  await createItem({
                    name: values.name || "",
                    description: values.description || "",
                    quantity: parseInt(values.quantity) || 0,
                  })
                  setSubmitting(false);
                  toast({
                    title: "Success",
                    description: "Item created successfully",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  })
                  router.back();
                }}
                validationSchema={ItemSchema}
              >
                {({ isSubmitting }) => (
                  <Form>
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
                        Create
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

export default CreateInventoryItemPage;