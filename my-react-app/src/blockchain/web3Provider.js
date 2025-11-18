// src/blockchain/web3Provider.js
import { ethers } from "ethers";
import contractABI from "./contractABI.json";
import { CONTRACT_ADDRESS } from "./contractConfig";

export async function getContract() {
  if (!window.ethereum) throw new Error("MetaMask chưa được cài!");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
}
export async function getFreeUsed(address) {
  const contract = await getContract();
  return await contract.getFreeUsed(address);
}

// ====== các hàm cũ ======
export async function getUploadCount(address) {
  const contract = await getContract();
  return await contract.uploadCount(address);
}

export async function getExtraUploads(address) {
  const contract = await getContract();
  return await contract.extraUploads(address);
}

export async function buySlots(amount) {
  const contract = await getContract();
  const price = ethers.parseEther("0.001"); // 0.001 ETH / slot
  const tx = await contract.buyUploadSlots(amount, {
    value: price * BigInt(amount),
  });
  await tx.wait();
  return true;
}

export async function addDocument(title, ipfsHash) {
  const contract = await getContract();
  const tx = await contract.addDocument(title, ipfsHash);
  await tx.wait();
  return true;
}

// ====== QUẢN LÝ DÒNG TIỀN / ADMIN ======

export async function getContractBalance() {
  if (!window.ethereum) throw new Error("MetaMask chưa được cài!");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const balanceWei = await provider.getBalance(CONTRACT_ADDRESS);
  return ethers.formatEther(balanceWei); // string
}

export async function getAdminAddress() {
  const contract = await getContract();
  return await contract.admin();
}

export async function withdrawAll() {
  const contract = await getContract();
  const tx = await contract.withdrawAll();
  await tx.wait();
  return true;
}
