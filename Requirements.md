Current Candle Gift Box Order Process
=====================================

1. Customer calls to place order
2. Designer answers phone
3. Designer selects fragrances from spreadsheet
4. Designer writes order on paper
5. Designer adds order to spreadsheet
6. Production manager reviews spreadsheet
7. Production manager assigns order to artisan
8. Artisan looks up recipe for each fragrance
9. Artisan creates 3 unique candles
10. Artisan adds personalized inscriptions
11. Candles packaged in gift box
12. Order completed


User Stories
============

Order Taker

1. Record client First Name, Last Name
2. Select client fragrances from dropdown (with active search)
3. Record client personalized Inscription
4. Record number of gift boxes desired
5. Record exactly 3 scents for candles
6. Creating order should change status to New Order (Automation)
7. Creating order should auto-fill order received date (Automation)
8. Changing status of order to done should auto-fill order completed date (Automation)

Production Manager

1. Create, Read, Update, Delete fragrances from database
2. View performance metrics
3. Change order status
4. Delete or edit orders


Artisan (Non-MVP)

1. View fragrance recipes 
2. View Inscription
3. Change order status to working on it, done, or stuck

Functional Requirements
=========================

Must-Haves

-- API that will CRUD fragrances using provided schema

-- Board View UI with selects for client information, 3 fragrances, and submit

-- UI must query backend for list of fragrances

-- Submitting an order must create an order on the production board

-- Apply constraints to order (3 fragrances required)

-- Automate created/completed dates and statuses

-- Automate metric collection and add to dashboard

Nice-to-haves

-- Manager/artisan view for CRUD operations

-- Working image urls integrated in the order UI retrieved from database

-- Seperate artisan view for orders containing fragrance recipe and inscription

------------------

Fragrance Management -- MongoDB

SLA dashboard -- Monday automation tools (webhooks?)

Monday platform integration -- Build zip and deploy (monday code?)

