"use client";
import { useOrganizationList } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
 
const JoinedOrganizationList = () => {
    const { isLoaded, userMemberships } = useOrganizationList({
        userMemberships: {
            infinite: true,
        },
    });
 
    if (!isLoaded) {
        return <>Kérlek várj...</>;
    }
 
  return (
        <div className="bg-neutral-800 rounded-lg p-10">
            {userMemberships.data.length > 0 ? (
                <div>
                    <p>A(z) <b>{userMemberships.data[0].organization.name}</b> szervezet tagja vagy.</p>
                </div>
                
            ):(
                <div>
                    <p>Nem vagy egy szervezet tagja sem!</p>
                    <Link href={"/business/create-organization"} className="underline">Hozz létre egyet!</Link>
                </div>
            )}
        </div>
  );
};

export default JoinedOrganizationList;