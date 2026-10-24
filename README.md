# StoreAssist AI

An AI-powered retail assistant designed to help store associates find products, check inventory, and discover relevant alternatives through a single interface.

## Project Overview

StoreAssist AI aims to simplify product discovery for retail employees by combining product search, product recommendations, and store-specific inventory information in one backend system.

## Features

- **Product Search:** Search products by brand, material, size, product name, and product family.
- **Product Recommendations:** Use weighted scoring to suggest relevant alternative products based on product attributes.
- **Store-Specific Inventory:** Retrieve product quantities and aisle and bay locations for individual stores.
- **Inventory Status:** Identify whether a product is in stock or out of stock at a specific store.
- **Product Vocabulary API:** Retrieve available product attributes from the database to support structured searches.

## Tech Stack

- **Language:** JavaScript
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (Neon)
- **API:** REST API
- **Version Control:** Git, GitHub

## Project Status

The backend currently supports product search, weighted product recommendations, and store-specific inventory lookups. AI-powered natural-language product interpretation is planned for a future development phase.

## Planned Improvements

- Integrate AI to interpret natural-language product requests and convert them into structured search criteria.
- Expand the product catalog to support a wider range of products and attributes.
- Develop a frontend interface for store associates.
- Explore integration with real retail inventory systems and handheld devices.
