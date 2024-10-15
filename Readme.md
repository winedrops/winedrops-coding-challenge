# Winedrops coding challenge

## Goal

Build a simple web app that displays the best selling wine.

We're looking for full stack engineers, so we've prepared you a task which touches frontend, backend, and the database. Only the infrastrure is missing... Well, if you can deploy it somewhere - then why not?

![mockup](./mockup.png)

## Requirements

- Display a list of the best selling wines
- Show the best selling wine:
  - No pagination needed
  - Top 10% wines should be highlighted in green
  - Bottom 10% wines should be highlighted in red
  - Ability to select what the `best selling means` - either by `revenue` or by `total number of bottls sold` or `number of orders`
- **Important note**:
  - We often sell the same wine at at different price (more details on that in the [Database schema section](#database-schema))
  - For example, `Château Montclair` is sold both at £40.26 and £40.76
  - So in the list of the best selling wine `Château Montclair` should appear only once and its entry should include the roll up of all orders, even if they were bought at a different price
  - **Vintage**, however, does mean that it is a different wine
- Only do that for orders which have status of either `paid` or `dispatched`
- Search
  - You start typing in the search bar and we only show the wines that match it
    - The search should be case insensitive
    - The search should be done on the `name` and `vintage` fields
    - For filtered out wines we should still see their position in the full list
    - And if it's a top 10% or bottom 10% we should highlight it

## Technical details

- We provide you with a `sqlite` database that it is already pre-populated with the data
  -- It's in the `backend/db/winedrops.db` file
- This repo also provides skaffolding for the frontend and backend
- To run the backend just do `cd backend && yarn dev`
  - The backend is using `fastify`
- The frontend is React
  - To run the frontend do `cd frontend && yarn dev`

## How to build

- It's up to you :-)
- You can use any 3rd party library you want
- For interacting with the database you can use an ORM or not - it's up to you
- For the API stick to using `fastify` but you can create any endpoints you want

## Database schema

- A few important things about the data model
- The same wine can be sold at different prices
  - For example, `Château Montclair` is sold both at £40.26 and £40.76
- That's why we have two separate tables `master_wine` and `wine_product`
  - `master_wine` contains the basic information about the wine - its name and vintage
  - and `wine_product` is `master_wine` plus a price we sell it at
  - `wine_product` does have the `name` field, but its for our own convenince rather than for showing it to the user

```sql
create table master_wine (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  vintage NUMBER
);

create table wine_product (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  master_wine_id INTEGER,
  name TEXT,
  price DECIMAL,
  FOREIGN KEY (master_wine_id) REFERENCES master_wine (id)
);

create table customer_order (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  wine_product_id INTEGER,
  quantity INTEGER,
  total_amount DECIMAL,
  status TEXT,
  FOREIGN KEY (wine_product_id) REFERENCES wine_product (id)
);
```

## Judgemenet criteria

- Does your app do what it's specified in the [Requirements](#requirements) section?
  - That section may not be the best written, but neither are our Trello tickets
  - So we'll see how you've interepreted the requirements
- How easy is it to understand your code?
  - Your code may work, but can other people understand and extend it?

## How to submit

- Create a private repo on GitHub and push your code there
- Invite `mikeborozdin` (`mike@winedrops.co.uk`) as a collaborator
- Send us the link to the repo
