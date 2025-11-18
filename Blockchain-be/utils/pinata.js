import axios from "axios";

export const uploadToPinata = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  const res = await axios.post(url, file, {
    maxContentLength: Infinity,
    headers: {
      "Content-Type": `multipart/form-data; boundary=${file._boundary}`,
      Authorization: `Bearer ${process.env.PINATA_JWT}`,
    },
  });

  return {
    ipfsHash: res.data.IpfsHash,
    fileUrl: `${process.env.PINATA_GATEWAY}${res.data.IpfsHash}`,
  };
};
