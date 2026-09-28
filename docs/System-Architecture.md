# **StoreAssist AI**

## **System Architecture**

### **1. System Overview**

StoreAssist AI will use a frontend, backend, AI services, and a product
database to process customer requests and return relevant product
information.

The system will follow this general workflow:

Customer Speech
|
v
Speech-to-Text
|
v
Language Detection
|
v
Translation
|
v
AI Product Understanding
|
v
Product Search
|
v
Product Database
|
v
Product Results

---

### **2. Frontend**

The frontend will provide the interface used by the retail associate.

The interface should allow the employee to:

- Start and stop customer speech capture
- View the customer's original request
- View the translated request
- View identified product attributes
- View product search results
- View product variations
- View inventory
- View aisle and bay information

The frontend will initially be designed for a handheld device.

Potential technology:

- React Native
- Expo

---

### **3. Backend**

The backend will handle communication between the frontend, AI services,
and product database.

The backend will be responsible for:

- Receiving customer requests
- Processing AI results
- Searching the product database
- Returning product information
- Managing communication between system components

Potential technology:

- Python
- FastAPI

---

### **4. Speech Processing**

The system will convert customer speech into text.

The speech processing system should:

1. Receive audio from the device.
2. Convert speech into text.
3. Identify the language being spoken.
4. Send the resulting text to the translation and AI systems.

Potential technology:

- Speech-to-Text API

---

### **5. Translation**

The translation system will convert the customer's request into a
language understood by the retail associate.

Example:

Customer:

"Necesito una broca para concreto."

Translation:

"I need a concrete drill bit."

Potential technology:

- Translation API
- AI translation model

---

### **6. AI Product Understanding**

The AI system will analyze the customer's request and extract
important product attributes.

Example:

Customer:

"I need a half-inch concrete drill bit for my drill."

AI output:

Category: Drill Bit

Size: 1/2 inch

Material: Concrete

Use: Drill

These attributes will be passed to the product search system.

Potential technology:

- Large Language Model (LLM)

---

### **7. Product Database**

The product database will contain information about the products
available in the prototype store.

Each product should contain information such as:

- Product name
- SKU
- Category
- Brand
- Description
- Size
- Material
- Product family
- Price
- Inventory
- Aisle
- Bay

The initial database will contain approximately 20–30 products.

Potential technologies:

- PostgreSQL
- Firebase

---

### **8. Product Search**

The product search system will use information extracted by the AI
to find relevant products.

Search should consider:

- Product name
- Category
- Description
- Brand
- Size
- Material
- Intended use
- Product family
- Related keywords

The search system should be able to return multiple relevant products
and variations.

---

### **9. Product Results**

The frontend will display the results returned by the backend.

Example:

Product: 1/2 in. Concrete Drill Bit

SKU: 123456

Inventory: 18

Aisle: 12

Bay: 4

Additional variations should be displayed when available.

---

### **10. Initial System Architecture**

```text
┌───────────────────────┐
│   Zebra Handheld      │
│                       │
│   React Native App    │
└───────────┬───────────┘
            │
            v
┌───────────────────────┐
│       Backend         │
│       FastAPI         │
└───────────┬───────────┘
            │
     ┌──────┼──────┐
     │      │      │
     v      v      v
┌────────┐ ┌─────┐ ┌─────────────┐
│ Speech │ │ AI  │ │ Translation │
│  API   │ │     │ │     API     │
└────────┘ └─────┘ └─────────────┘
            │
            v
┌───────────────────────┐
│   Product Database    │
│                       │
│ PostgreSQL / Firebase │
└───────────┬───────────┘
            │
            v
┌───────────────────────┐
│    Product Results    │
│                       │
│ SKU / Inventory       │
│ Aisle / Bay           │
│ Variations            │
└───────────────────────┘
```

## **11. MVP Architecture**

The initial prototype will simplify the architecture.

The first version will use:

- A local or cloud product database
- A simple frontend
- A backend API
- Mock inventory data
- External AI services where necessary

Real retail systems and Zebra device deployment will not be required
for the initial prototype.

---

## **12. Future Architecture**

Future versions may include:

- Real-time inventory systems
- Retail APIs
- Store authentication
- Multiple store locations
- Barcode scanning
- Store maps
- Zebra device management
- Production cloud infrastructure
