import { useState } from "react";
import { useContract } from "@thirdweb-dev/react";
import { NFT_COLLECTION_ADDRESS } from "../const/addresses";

const AddNFT = () => {
  const { contract } = useContract(NFT_COLLECTION_ADDRESS); // Использование адреса из констант
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !file) return;

    try {
      // Загрузка файла на IPFS с помощью thirdweb storage
      const metadata = {
        name,
        description,
        image: file, // Thirdweb handle file uploads automatically
      };

      const tx = await contract.erc721.mint(metadata);
      console.log("NFT created successfully:", tx);
    } catch (error) {
      console.error("Error creating NFT:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="file">Image:</label>
        <input
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
      </div>
      <button type="submit">Create NFT</button>
    </form>
  );
};

export default AddNFT;
