import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const breedIdMap = {
  // Existing breeds
  Lab : 1,
  Golden: 2,
  Persian: 3,
  Chinese: 4,

  // Additional breeds
  Beagle: 5,
  Bulldog: 6,
  Poodle: 7,
  Rottweiler: 8,
  MaineCoon: 9,
  Siamese: 10,
  Sphynx: 11,
  ScottishFold: 12,
  
};


const supplyCategoryMap = {
  Food: 1,
  Play: 2
};

const AddProduct = () => {
  const [productType, setProductType] = useState('pet');
  const [product, setProduct] = useState({
    name: '',
    category: 'Food',
    price: '',
    quantity: '',
    image: null,
    description: '',
    petType: 'Dog',
    breed: 'Lab',
    age: '',
    gender: 'Male',
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setProduct({
      ...product,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('price', product.price);
    formData.append('quantity', product.quantity);
    formData.append('image', product.image);
    formData.append('description', product.description);

    if (productType === 'pet') {
      const petType = {
        petTypeId: product.petType === 'Dog' ? 1 : 2,
        petTypeName: product.petType
      };

      const breed = {
        breedId: breedIdMap[product.breed],
        breedName: product.breed,
        petType
      };

      formData.append('name', product.name);
      formData.append('petType', JSON.stringify(petType));
      formData.append('breed', JSON.stringify(breed));
      formData.append('age', product.age);
      formData.append('gender', product.gender);
      formData.append('status', "Available");

      try {
        const response = await fetch('http://localhost:8080/pets', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          const pet = await response.json();
          console.log('Pet added successfully:', pet);
          toast.success('Pet added successfully!');
        } else {
          console.error('Failed to add pet');
          toast.error('Failed to add pet');
        }
      } catch (error) {
        console.error('Error adding pet:', error);
        toast.error('Error adding pet');
      }
    } else {
      formData.append('supplyName', product.name);

      const category = {
        categoryId: supplyCategoryMap[product.category],
        categoryName: product.category
      };

      formData.append('category', JSON.stringify(category));

      try {
        const response = await fetch('http://localhost:8080/supplies', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          const supply = await response.json();
          console.log('Pet supply added successfully:', supply);
          toast.success('Pet supply added successfully!');
        } else {
          console.error('Failed to add pet supply');
          toast.error('Failed to add pet supply');
        }
      } catch (error) {
        console.error('Error adding pet supply:', error);
        toast.error('Error adding pet supply');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productType" className="form-label">Product Type:</label>
          <select
            id="productType"
            name="productType"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="form-select"
          >
            <option value="pet">Pet</option>
            <option value="supply">Pet Supply</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">{productType === 'pet' ? 'Pet Name:' : 'Supply Name:'}</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder={productType === 'pet' ? 'Pet Name' : 'Supply Name'}
            value={product.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {productType !== 'pet' && (
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category:</label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="form-select"
            >
              <option value="Food">Food</option>
              <option value="Play">Play</option>
            </select>
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Quantity"
            value={product.quantity}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {productType === 'pet' && (
          <>
            <div className="mb-3">
              <label htmlFor="petType" className="form-label">Pet Type:</label>
              <select
                id="petType"
                name="petType"
                value={product.petType}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="breed" className="form-label">Breed:</label>
              <select
                id="breed"
                name="breed"
                value={product.breed}
                onChange={handleChange}
                className="form-select"
              >
                {product.petType === 'Dog' ? (
                  <>
                    <option value="Lab">Labrador</option>
                    <option value="Golden">Golden</option>
                    <option value="Beagle">Beagle</option>
                    <option value="Bulldog">Bulldog</option>
                    <option value="Poodle">Poodle</option>
                    <option value="Rottweiler">Rottweiler</option>
                  </>
                ) : (
                  <>
                    <option value="Persian">Persian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="MaineCoon">Maine Coon</option>
                    <option value="Siamese">Siamese</option>
                    <option value="Sphynx">Sphynx</option>
                    <option value="ScottishFold">Scottish Fold</option>
                  </>
                )}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="age" className="form-label">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                placeholder="Age"
                value={product.age}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="gender" className="form-label">Gender:</label>
              <select
                id="gender"
                name="gender"
                value={product.gender}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </>
        )}

        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
