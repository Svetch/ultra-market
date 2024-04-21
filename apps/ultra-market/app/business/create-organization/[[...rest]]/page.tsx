import { CreateOrganization } from "@clerk/nextjs";

export default async function Index() {
    return (
        <div className="content-center mx-auto">
            <CreateOrganization afterCreateOrganizationUrl="/business"/>
        </div>
    );
}