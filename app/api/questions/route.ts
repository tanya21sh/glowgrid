import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { company, role, category, taskTitle } = await req.json();

    if (!company || !role || !category || !taskTitle) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Mock questions data based on category and company
    const questionsData: any = {
      "DSA - Data Structures": {
        "Arrays & Strings": {
          Google: [
            { question: "Implement a function to find two numbers in an array that add up to a target sum", difficulty: "medium" },
            { question: "Given a string, find the longest substring without repeating characters", difficulty: "medium" },
            { question: "Reverse a string in-place without using extra space", difficulty: "easy" },
            { question: "Design an algorithm to compress a string (e.g., 'aabbbcc' -> 'a2b3c2')", difficulty: "medium" },
            { question: "Find all permutations of a given string", difficulty: "hard" },
          ],
          Microsoft: [
            { question: "Implement a function to check if two strings are anagrams", difficulty: "easy" },
            { question: "Find the first non-repeating character in a string", difficulty: "easy" },
            { question: "Given an array of numbers, find the maximum product of any two elements", difficulty: "medium" },
            { question: "Implement a sliding window algorithm to find maximum sum subarray of size k", difficulty: "medium" },
          ],
          Amazon: [
            { question: "Implement a function to find all pairs in an array that sum to a given value", difficulty: "medium" },
            { question: "Rotate an array by k positions", difficulty: "medium" },
            { question: "Find the median of two sorted arrays", difficulty: "hard" },
            { question: "Implement a function to find the longest palindromic substring", difficulty: "hard" },
          ],
        },
        "Linked Lists": {
          Google: [
            { question: "Reverse a linked list iteratively and recursively", difficulty: "medium" },
            { question: "Detect if a linked list has a cycle", difficulty: "medium" },
            { question: "Find the intersection point of two linked lists", difficulty: "medium" },
            { question: "Merge two sorted linked lists", difficulty: "easy" },
            { question: "Copy a linked list with random pointers", difficulty: "hard" },
          ],
          Microsoft: [
            { question: "Remove the nth node from the end of a linked list", difficulty: "medium" },
            { question: "Swap nodes in pairs in a linked list", difficulty: "medium" },
            { question: "Reorder linked list (L0 -> Ln -> L1 -> Ln-1)", difficulty: "medium" },
          ],
          Amazon: [
            { question: "Check if a linked list is a palindrome", difficulty: "easy" },
            { question: "Split a linked list into k consecutive parts", difficulty: "hard" },
            { question: "Delete duplicates from sorted linked list", difficulty: "easy" },
          ],
        },
        "Stacks & Queues": {
          Google: [
            { question: "Implement a stack using queues", difficulty: "medium" },
            { question: "Implement a queue using stacks", difficulty: "medium" },
            { question: "Evaluate expressions using stacks (RPN)", difficulty: "medium" },
            { question: "Find the next greater element for each element in an array", difficulty: "medium" },
            { question: "Design a min stack that supports push, pop, top, and getMin in O(1)", difficulty: "medium" },
          ],
          Microsoft: [
            { question: "Check if parentheses are balanced in a string", difficulty: "easy" },
            { question: "Implement a stack with getMin() operation", difficulty: "easy" },
            { question: "Largest rectangle in histogram", difficulty: "hard" },
          ],
          Amazon: [
            { question: "Implement LRU cache using stack and hash map", difficulty: "hard" },
            { question: "Trapping rain water problem", difficulty: "hard" },
            { question: "Implement monotonic stack for next greater element", difficulty: "medium" },
          ],
        },
        "Trees & Graphs": {
          Google: [
            { question: "Serialize and deserialize a binary tree", difficulty: "hard" },
            { question: "Find the lowest common ancestor of two nodes in a BST", difficulty: "medium" },
            { question: "Implement BFS and DFS traversals", difficulty: "medium" },
            { question: "Find if path exists in a graph using DFS/BFS", difficulty: "medium" },
            { question: "Topological sort using DFS (for directed acyclic graphs)", difficulty: "medium" },
          ],
          Microsoft: [
            { question: "Inorder, preorder, postorder traversal of binary tree", difficulty: "easy" },
            { question: "Check if a binary tree is balanced", difficulty: "easy" },
            { question: "Find diameter of a binary tree", difficulty: "medium" },
          ],
          Amazon: [
            { question: "Number of islands problem (count connected components)", difficulty: "medium" },
            { question: "Course schedule (detect cycle in directed graph)", difficulty: "medium" },
            { question: "Word ladder problem (shortest path in graph)", difficulty: "hard" },
          ],
        },
      },
      "System Design": {
        "Scalability Basics": {
          Google: [
            { question: "How would you design a system to handle 1M requests per second?", difficulty: "hard" },
            { question: "Explain horizontal vs vertical scaling and when to use each", difficulty: "medium" },
            { question: "Design a load balancer for distributing traffic", difficulty: "hard" },
            { question: "How do you handle database sharding at scale?", difficulty: "hard" },
          ],
          Microsoft: [
            { question: "What are the bottlenecks in a typical web application?", difficulty: "medium" },
            { question: "How would you scale a monolithic application?", difficulty: "medium" },
            { question: "Explain eventual consistency vs strong consistency", difficulty: "medium" },
          ],
          Amazon: [
            { question: "Design a system to track real-time inventory across multiple warehouses", difficulty: "hard" },
            { question: "How would you handle millions of concurrent users?", difficulty: "hard" },
            { question: "What are CAP theorem trade-offs and how do they apply?", difficulty: "medium" },
          ],
        },
        "Database Design": {
          Google: [
            { question: "Design a schema for a social media platform", difficulty: "hard" },
            { question: "When would you use NoSQL vs SQL databases?", difficulty: "medium" },
            { question: "How do you implement transactions in a distributed system?", difficulty: "hard" },
            { question: "Design database indexes for optimal query performance", difficulty: "hard" },
          ],
          Microsoft: [
            { question: "Normalize a database schema (1NF, 2NF, 3NF)", difficulty: "medium" },
            { question: "How would you backup and restore a large database?", difficulty: "medium" },
            { question: "Explain ACID properties and how to ensure them", difficulty: "easy" },
          ],
          Amazon: [
            { question: "Design a database for e-commerce product catalog", difficulty: "hard" },
            { question: "How do you handle data replication and consistency?", difficulty: "hard" },
            { question: "Design a time-series database for analytics", difficulty: "hard" },
          ],
        },
        "Caching Strategies": {
          Google: [
            { question: "Design an LRU cache with O(1) get and put operations", difficulty: "medium" },
            { question: "When should you use Redis vs Memcached?", difficulty: "medium" },
            { question: "How do you handle cache invalidation and staleness?", difficulty: "hard" },
            { question: "Implement cache warming and preloading strategies", difficulty: "hard" },
          ],
          Microsoft: [
            { question: "What are cache eviction policies and when to use each?", difficulty: "easy" },
            { question: "Design a distributed caching layer", difficulty: "hard" },
            { question: "How do you prevent cache stampedes?", difficulty: "medium" },
          ],
          Amazon: [
            { question: "Implement a multi-level caching strategy", difficulty: "hard" },
            { question: "Cache consistency in microservices architecture", difficulty: "hard" },
            { question: "Design cache for high-traffic e-commerce site", difficulty: "hard" },
          ],
        },
        "Microservices": {
          Google: [
            { question: "How do microservices communicate? (RPC, messaging, events)", difficulty: "medium" },
            { question: "Design API gateway for microservices architecture", difficulty: "hard" },
            { question: "Handle distributed transactions across microservices", difficulty: "hard" },
            { question: "Implement service discovery and load balancing", difficulty: "hard" },
          ],
          Microsoft: [
            { question: "What are pros and cons of microservices vs monolith?", difficulty: "medium" },
            { question: "Design circuit breaker pattern for fault tolerance", difficulty: "medium" },
            { question: "Implement retry logic and exponential backoff", difficulty: "easy" },
          ],
          Amazon: [
            { question: "Design microservices for AWS e-commerce platform", difficulty: "hard" },
            { question: "Implement saga pattern for distributed transactions", difficulty: "hard" },
            { question: "Event-driven architecture with Kafka/SNS", difficulty: "hard" },
          ],
        },
      },
      "CS Fundamentals": {
        "Operating Systems": {
          Google: [
            { question: "Explain process vs thread and when to use each", difficulty: "medium" },
            { question: "How does virtual memory work?", difficulty: "medium" },
            { question: "Explain page replacement algorithms (LRU, FIFO, etc.)", difficulty: "medium" },
            { question: "What is a deadlock and how to prevent it?", difficulty: "medium" },
          ],
          Microsoft: [
            { question: "Explain semaphores and mutexes for synchronization", difficulty: "medium" },
            { question: "How does context switching work?", difficulty: "easy" },
            { question: "What is thrashing and how to prevent it?", difficulty: "medium" },
          ],
          Amazon: [
            { question: "Design a scheduling algorithm for CPU", difficulty: "hard" },
            { question: "Explain how file systems work (inodes, blocks)", difficulty: "medium" },
            { question: "How do you implement a thread pool?", difficulty: "hard" },
          ],
        },
        "Networks": {
          Google: [
            { question: "Explain OSI model and TCP/IP layers", difficulty: "medium" },
            { question: "How does DNS resolution work?", difficulty: "medium" },
            { question: "Explain difference between TCP and UDP", difficulty: "easy" },
            { question: "How does HTTPS/TLS work?", difficulty: "medium" },
          ],
          Microsoft: [
            { question: "What is a socket and how to use it?", difficulty: "easy" },
            { question: "Explain congestion control in TCP", difficulty: "medium" },
            { question: "How does routing work in IP networks?", difficulty: "medium" },
          ],
          Amazon: [
            { question: "Design a CDN for global content delivery", difficulty: "hard" },
            { question: "How would you optimize network latency?", difficulty: "hard" },
            { question: "Explain load balancing strategies", difficulty: "hard" },
          ],
        },
        "Databases": {
          Google: [
            { question: "Explain database indexes and when to use them", difficulty: "medium" },
            { question: "How do you optimize slow SQL queries?", difficulty: "medium" },
            { question: "What is query execution planning?", difficulty: "medium" },
            { question: "Explain ACID properties", difficulty: "easy" },
          ],
          Microsoft: [
            { question: "What are database locks and isolation levels?", difficulty: "medium" },
            { question: "Explain normalization forms (1NF, 2NF, 3NF, BCNF)", difficulty: "medium" },
            { question: "How to handle concurrent transactions?", difficulty: "medium" },
          ],
          Amazon: [
            { question: "Design a database for analytics platform", difficulty: "hard" },
            { question: "Implement data partitioning strategy", difficulty: "hard" },
            { question: "Optimize joins in large datasets", difficulty: "hard" },
          ],
        },
        "Algorithms Complexity": {
          Google: [
            { question: "Explain Big O notation and analyze time/space complexity", difficulty: "easy" },
            { question: "What is the difference between O(n) and O(n²)?", difficulty: "easy" },
            { question: "Analyze complexity of binary search, merge sort, quicksort", difficulty: "medium" },
            { question: "What are P, NP, and NP-hard problems?", difficulty: "hard" },
          ],
          Microsoft: [
            { question: "How do you optimize algorithms for better complexity?", difficulty: "medium" },
            { question: "Explain dynamic programming and memoization", difficulty: "medium" },
            { question: "What is amortized analysis?", difficulty: "medium" },
          ],
          Amazon: [
            { question: "Design algorithms for massive scale data processing", difficulty: "hard" },
            { question: "Implement approximation algorithms for NP-hard problems", difficulty: "hard" },
            { question: "Optimize MapReduce algorithms for Hadoop", difficulty: "hard" },
          ],
        },
      },
      "Behavioral": {
        "Tell me about yourself": {
          Google: [
            { question: "Walk us through your most complex project and your role", difficulty: "medium" },
            { question: "What attracted you to Google specifically?", difficulty: "medium" },
            { question: "Describe a time you learned something new quickly", difficulty: "easy" },
          ],
          Microsoft: [
            { question: "Tell us about your experience with cloud technologies", difficulty: "medium" },
            { question: "What's your background and why Microsoft?", difficulty: "medium" },
          ],
          Amazon: [
            { question: "Describe a time you went above and beyond", difficulty: "medium" },
            { question: "Tell us about your e-commerce or retail experience", difficulty: "medium" },
          ],
        },
        "Why this company?": {
          Google: [
            { question: "What excites you about Google's mission and products?", difficulty: "medium" },
            { question: "How do you see yourself contributing to Google's goals?", difficulty: "medium" },
            { question: "What do you know about Google's engineering culture?", difficulty: "easy" },
          ],
          Microsoft: [
            { question: "Why are you interested in working at Microsoft?", difficulty: "medium" },
            { question: "Which Microsoft products do you use and why?", difficulty: "easy" },
          ],
          Amazon: [
            { question: "What appeals to you about Amazon's leadership principles?", difficulty: "medium" },
            { question: "How do you align with Amazon's customer-obsessed culture?", difficulty: "medium" },
          ],
        },
        "Describe a challenge": {
          Google: [
            { question: "Tell us about a technical challenge you overcame", difficulty: "medium" },
            { question: "Describe a conflict with a teammate and how you resolved it", difficulty: "medium" },
            { question: "Share a time you failed and what you learned", difficulty: "medium" },
          ],
          Microsoft: [
            { question: "How did you handle a difficult deadline?", difficulty: "medium" },
            { question: "Describe a time you had to work with ambiguous requirements", difficulty: "medium" },
          ],
          Amazon: [
            { question: "Tell us about a time you had to scale something quickly", difficulty: "medium" },
            { question: "Describe when you made a customer-centric decision", difficulty: "medium" },
          ],
        },
        "Team collaboration": {
          Google: [
            { question: "Describe your experience working in cross-functional teams", difficulty: "medium" },
            { question: "How do you mentor junior engineers?", difficulty: "medium" },
            { question: "Tell us about a time you received critical feedback", difficulty: "medium" },
          ],
          Microsoft: [
            { question: "How do you ensure code quality in a team setting?", difficulty: "easy" },
            { question: "Describe your experience with code reviews", difficulty: "easy" },
          ],
          Amazon: [
            { question: "How do you collaborate with non-technical stakeholders?", difficulty: "medium" },
            { question: "Tell us about building high-performing teams", difficulty: "medium" },
          ],
        },
      },
    };

    // Get questions for the specific category and task
    const categoryQuestions = questionsData[category as keyof typeof questionsData];
    if (!categoryQuestions) {
      return NextResponse.json(
        { questions: [], message: `No questions available for category: ${category}` },
        { status: 200 }
      );
    }

    const taskQuestions = categoryQuestions[taskTitle as keyof typeof categoryQuestions];
    if (!taskQuestions) {
      return NextResponse.json(
        { questions: [], message: `No questions available for task: ${taskTitle}` },
        { status: 200 }
      );
    }

    const companyQuestions = taskQuestions[company as keyof typeof taskQuestions] || taskQuestions['Google'] || [];

    return NextResponse.json({
      questions: companyQuestions,
      company,
      role,
      category,
      taskTitle,
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
