import axios from "axios";
import { ICategory } from "../config/interface";

const API_URL = "http://localhost:5000/products";
class ProductService {
  async getAllProducts(searchParams?: string) {
    try {
      const response = await axios.get(
        searchParams ? `${API_URL}?search=${searchParams}` : API_URL
      );
      return response.data.products;
    } catch (error) {
      console.log("error : ", error);
      return null;
    }
  }
  async getProductById(id: string) {
    const response = await axios.get(`${API_URL}/id/${id}`);
    return response.data.product;
  }

  async createProduct(product: FormData) {
    try {
      const response = await axios.post(`${API_URL}/add`, product);
      return response.data;
    } catch (error) {
      console.log("create product error : ", error);
      return null;
    }
  }

  async updateProduct(id: string, product: FormData) {
    try {
      const response = await axios.put(`${API_URL}/update/${id}`, product);
      console.log("update product complete");
      return response.data;
    } catch (error) {
      console.log("update product error : ", error);
      return null;
    }
  }

  async deleteProduct(id: string) {
    if (!id) return null;
    try {
      const response = await axios.delete(`${API_URL}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.log("delete product error : ", error);
      return null;
    }
  }

  async getAllCategories(searchParams?: string) {
    try {
      const response = await axios.get(
        searchParams
          ? `${API_URL}/categories?search=${searchParams}`
          : `${API_URL}/categories`
      );
      // console.log("get all categories : ", response.data);
      return response.data.categories;
    } catch (error) {
      console.log("get all categories error : ", error);
      return null;
    }
  }
  async getActiveCategories() {
    try {
      const response = await axios.get(`${API_URL}/categories/active`);
      return response.data.categories;
    } catch (error) {
      console.log("get all categories error : ", error);
      return null;
    }
  }
  async createCategory(category: ICategory) {
    if (!category.name || !category.status) return null;
    try {
      const response = await axios.post(`${API_URL}/categories/add`, category);
      return response.data;
    } catch (error) {
      console.log("create category error : ", error);
      return null;
    }
  }
  async updateCategory(id: string, category: ICategory) {
    if (!id)
      return {
        success: false,
        message: "Category ID is required",
      };
    try {
      const response = await axios.put(
        `${API_URL}/categories/update/${id}`,
        category
      );
      return response.data;
    } catch (error) {
      console.log("update category error : ", error);
      return null;
    }
  }
  async deleteCategory(id: string) {
    if (!id)
      return {
        success: false,
        message: "Category ID is required",
      };
    try {
      const response = await axios.delete(`${API_URL}/categories/delete/${id}`);
      return response.data;
    } catch (error) {
      console.log("delete category error : ", error);
      return null;
    }
  }
}

export default new ProductService();
