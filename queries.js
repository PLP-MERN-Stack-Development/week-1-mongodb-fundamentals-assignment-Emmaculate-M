
// queries.js - MongoDB Queries for PLP Bookstore Project

// Basic Queries

// 1. Find all books in the genre "Fiction"
db.books.find({ genre: "Fiction" });

// 2. Find books published after 1950
db.books.find({ published_year: { $gt: 1950 } });

// 3. Find books by the author "George Orwell"
db.books.find({ author: "George Orwell" });

// 4. Update the price of the book titled "1984"
db.books.updateOne({ title: "1984" }, { $set: { price: 13.99 } });

// 5. Delete the book titled "Moby Dick"
db.books.deleteOne({ title: "Moby Dick" });

// Advanced Queries

// 6. Find books that are in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// 7. Projection: Return only title, author, and price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// 8. Sort books by price ascending
db.books.find().sort({ price: 1 });

// 9. Sort books by price descending
db.books.find().sort({ price: -1 });

// 10. Pagination: 5 books per page (page 1 and 2)
db.books.find().skip(0).limit(5); // Page 1
db.books.find().skip(5).limit(5); // Page 2

// Aggregation Pipelines

// 11. Calculate average price by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

// 12. Find the author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// 13. Group books by publication decade and count them
db.books.aggregate([
  {
    $group: {
      _id: {
        $concat: [
          { $substr: ["$published_year", 0, 3] },
          "0s"
        ]
      },
      count: { $sum: 1 }
    }
  }
]);

// Indexing

// 14. Create index on title
db.books.createIndex({ title: 1 });

// 15. Create compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

// 16. Use explain() to analyze performance
db.books.find({ title: "1984" }).explain("executionStats");
