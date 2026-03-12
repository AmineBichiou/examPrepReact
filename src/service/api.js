import axios from "axios";

const url = "http://localhost:3001/produits";

export const getAllproduits = async (id) => {
  id = id || "";
  return await axios.get(`${url}/${id}`);
};

export const addproduit = async (produit) => {
  return await axios.post(url, produit);
};

export const editproduit = async (id, produit) => {
  return await axios.put(`${url}/${id}`, produit);
};

export const deleteproduit = async (id) => {
  return await axios.delete(`${url}/${id}`);
};


