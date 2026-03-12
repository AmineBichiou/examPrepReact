import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getAllproduits, addproduit, editproduit, deleteproduit } from "../service/api";

const useProduitStore = create(
  persist(
    (set) => ({
      produits: [],
      errors: "",

      populateProduits: (produits) => set({ produits }),

      deleteProduitObject: (id) =>
        set((state) => ({
          produits: state.produits.filter((item) => item.id !== id),
        })),

      updateProduitObject: (updatedProduit) =>
        set((state) => ({
          produits: state.produits.map((item) =>
            item.id === updatedProduit.id ? updatedProduit : item
          ),
        })),

      addProduitObject: (produit) =>
        set((state) => ({
          produits: [...state.produits, produit],
        })),

      fetchProduits: async () => {
        try {
          const response = await getAllproduits();
          set({ produits: response.data, errors: null });
        } catch (error) {
          set({ errors: error });
        }
      },

      fetchProduitById: async (id) => {
        try {
          const response = await getAllproduits(id);
          return response.data;
        } catch (error) {
          set({ errors: error });
          throw error;
        }
      },

      addProduitAsync: async (produit) => {
        try {
          const response = await addproduit(produit);
          set((state) => ({
            produits: [...state.produits, response.data],
            errors: null,
          }));
          return response.data;
        } catch (error) {
          set({ errors: error });
          throw error;
        }
      },

      updateProduitAsync: async (id, updatedProduit) => {
        try {
          const response = await editproduit(id, updatedProduit);
          set((state) => ({
            produits: state.produits.map((item) =>
              item.id === Number(id) ? response.data : item
            ),
            errors: null,
          }));
          return response.data;
        } catch (error) {
          set({ errors: error });
          throw error;
        }
      },

      deleteProduitAsync: async (id) => {
        try {
          await deleteproduit(id);
          set((state) => ({
            produits: state.produits.filter((item) => item.id !== id),
            errors: null,
          }));
        } catch (error) {
          set({ errors: error });
          throw error;
        }
      },
    }),
    {
      name: "produit-storage",
    }
  )
);

export default useProduitStore;
