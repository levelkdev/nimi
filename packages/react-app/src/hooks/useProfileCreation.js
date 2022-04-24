  const abi = [
    "function proxyCreateProfile(DataTypes.CreateProfileData calldata vars) returns (bool)",
  ];

  const address = "0x39c9Bc23B1F993B94dEC69B7Ac11C95145EC4e15";

  const MockProfileCreationProxy = new ethers.Contract(address, abi, provider);

  const inputStruct: CreateProfileDataStruct = {
    to: user.address,
    handle: 'zer0dot',
    imageURI: 'img',
    followModule: ZERO_ADDRESS,
    followModuleData: [],
    followNFTURI: 'img',
  };

  MockProfileCreationProxy.proxyCreateProfile(inputStruct);










import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export const GET_DOMAINS_SUBGRAPH = gql`
  query getDomains($id: ID!, $first: Int, $skip: Int, $orderBy: Domain_orderBy) {
    account(id: $id) {
      domains(first: $first, skip: $skip, orderBy: $orderBy) {
        labelName
        labelhash
        name
        isMigrated
        parent {
          name
        }
      }
    }
  }
`;

export default function useEnsDomains(address = "") {
  const [loadingState, setLoading] = useState(true);
  const [domains, setDomains] = useState([]);
  const { data, loading } = useQuery(GET_DOMAINS_SUBGRAPH, {
    variables: {
      id: address.toLowerCase(),
      first: 100,
    },

    fetchPolicy: "no-cache",
  });
  useEffect(() => {
    if (loading || !data.account) {
      setLoading(true);
    } else {
      setDomains(data.account.domains);
      setLoading(false);
    }
  }, [address, data, loading]);
  return { domains, loadingState };
}