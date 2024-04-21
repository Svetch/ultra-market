import { CreateOrganization } from "@clerk/nextjs";

export default async function Index() {
    return (
        <CreateOrganization afterCreateOrganizationUrl="/business"/>
        /*<CreateOrganization path="/create-organization" />*/
    );
}