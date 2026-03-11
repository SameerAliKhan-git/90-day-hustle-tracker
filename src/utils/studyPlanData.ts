// 60-Day UGC NET Study Plan — Section-wise with full syllabus topics

export interface StudyTopic {
  id: string;
  title: string;
}

export interface StudyDay {
  day: number;
  title: string;
  topics: StudyTopic[];
}

export interface StudyUnit {
  unit: number;
  title: string;
  days: StudyDay[];
  syllabusTopics: string[];
}

export const STUDY_PLAN: StudyUnit[] = [
  {
    unit: 1,
    title: 'Discrete Structures & Optimization',
    days: [
      {
        day: 1,
        title: 'Mathematical Logic, Sets & Relations',
        topics: [
          { id: 'u1d1t1', title: 'Propositional Logic & Predicate Logic' },
          { id: 'u1d1t2', title: 'Propositional Equivalences & Normal Forms' },
          { id: 'u1d1t3', title: 'Predicates, Quantifiers & Nested Quantifiers' },
          { id: 'u1d1t4', title: 'Rules of Inference' },
          { id: 'u1d1t5', title: 'Set Operations & Representation' },
          { id: 'u1d1t6', title: 'Properties of Relations & Equivalence Relations' },
          { id: 'u1d1t7', title: 'Partially Ordering' },
        ],
      },
      {
        day: 2,
        title: 'Mathematical Logic, Sets & Relations (Continued)',
        topics: [
          { id: 'u1d2t1', title: 'Practice Problems — Propositional Logic' },
          { id: 'u1d2t2', title: 'Practice Problems — Predicate Logic' },
          { id: 'u1d2t3', title: 'Practice Problems — Sets & Relations' },
          { id: 'u1d2t4', title: 'Revision & PYQ Practice' },
        ],
      },
      {
        day: 3,
        title: 'Counting, Induction, Probability, Bayes\' Theorem',
        topics: [
          { id: 'u1d3t1', title: 'Basics of Counting & Pigeonhole Principle' },
          { id: 'u1d3t2', title: 'Permutations & Combinations' },
          { id: 'u1d3t3', title: 'Inclusion-Exclusion Principle' },
          { id: 'u1d3t4', title: 'Mathematical Induction' },
          { id: 'u1d3t5', title: 'Probability & Bayes\' Theorem' },
        ],
      },
      {
        day: 4,
        title: 'Group Theory basics & applications',
        topics: [
          { id: 'u1d4t1', title: 'Groups, Subgroups, Semi Groups' },
          { id: 'u1d4t2', title: 'Product & Quotients of Algebraic Structures' },
          { id: 'u1d4t3', title: 'Isomorphism, Homomorphism, Automorphism' },
          { id: 'u1d4t4', title: 'Rings, Integral Domains, Fields' },
          { id: 'u1d4t5', title: 'Applications of Group Theory' },
        ],
      },
      {
        day: 5,
        title: 'Graph Theory (paths, circuits, coloring, trees)',
        topics: [
          { id: 'u1d5t1', title: 'Simple Graph, Multigraph, Weighted Graph' },
          { id: 'u1d5t2', title: 'Paths, Circuits & Shortest Paths' },
          { id: 'u1d5t3', title: 'Eulerian & Hamiltonian Paths/Circuits' },
          { id: 'u1d5t4', title: 'Planar Graph & Graph Coloring' },
          { id: 'u1d5t5', title: 'Bipartite Graphs' },
          { id: 'u1d5t6', title: 'Trees, Rooted Trees, Prefix Codes, Traversals' },
          { id: 'u1d5t7', title: 'Spanning Trees & Cut-Sets' },
        ],
      },
      {
        day: 6,
        title: 'Boolean Algebra & Optimization (LP, Simplex, PERT-CPM)',
        topics: [
          { id: 'u1d6t1', title: 'Boolean Functions & Representation' },
          { id: 'u1d6t2', title: 'Simplification of Boolean Functions' },
          { id: 'u1d6t3', title: 'Linear Programming — Mathematical Model & Graphical Solution' },
          { id: 'u1d6t4', title: 'Simplex & Dual Simplex Method' },
          { id: 'u1d6t5', title: 'Sensitivity Analysis & Integer Programming' },
          { id: 'u1d6t6', title: 'Transportation & Assignment Models' },
          { id: 'u1d6t7', title: 'PERT-CPM: Critical Path, Resource Levelling, Cost Scheduling' },
        ],
      },
    ],
    syllabusTopics: [
      'Mathematical Logic: Propositional and Predicate Logic, Propositional Equivalences, Normal Forms, Predicates and Quantifiers, Nested Quantifiers, Rules of Inference',
      'Sets and Relations: Set Operations, Representation and Properties of Relations, Equivalence Relations, Partially Ordering',
      'Counting, Mathematical Induction and Discrete Probability: Basics of Counting, Pigeonhole Principle, Permutations and Combinations, Inclusion-Exclusion Principle, Mathematical Induction, Probability, Bayes\' Theorem',
      'Group Theory: Groups, Subgroups, Semi Groups, Product and Quotients of Algebraic Structures, Isomorphism, Homomorphism, Automorphism, Rings, Integral Domains, Fields, Applications of Group Theory',
      'Graph Theory: Simple Graph, Multigraph, Weighted Graph, Paths and Circuits, Shortest Paths, Eulerian/Hamiltonian Paths and Circuits, Planar graph, Graph Coloring, Bipartite Graphs, Trees and Rooted Trees, Prefix Codes, Tree Traversals, Spanning Trees and Cut-Sets',
      'Boolean Algebra: Boolean Functions and Representation, Simplifications of Boolean Functions',
      'Optimization: Linear Programming, Graphical Solution, Simplex and Dual Simplex Method, Sensitive Analysis, Integer Programming, Transportation and Assignment Models, PERT-CPM',
    ],
  },
  {
    unit: 2,
    title: 'Computer System Architecture',
    days: [
      {
        day: 7,
        title: 'Digital Logic Circuits, Data Representation',
        topics: [
          { id: 'u2d7t1', title: 'Digital Computers & Logic Gates' },
          { id: 'u2d7t2', title: 'Boolean Algebra & Map Simplifications' },
          { id: 'u2d7t3', title: 'Combinational Circuits & Flip-Flops' },
          { id: 'u2d7t4', title: 'Sequential Circuits, ICs, Decoders, Multiplexers' },
          { id: 'u2d7t5', title: 'Registers, Counters & Memory Unit' },
          { id: 'u2d7t6', title: 'Data Types & Number Systems Conversion' },
          { id: 'u2d7t7', title: 'Complements, Fixed/Floating Point, Error Detection' },
          { id: 'u2d7t8', title: 'Computer Arithmetic Algorithms (Add, Sub, Mul, Div)' },
        ],
      },
      {
        day: 8,
        title: 'Register Transfer, Microoperations',
        topics: [
          { id: 'u2d8t1', title: 'Register Transfer Language' },
          { id: 'u2d8t2', title: 'Bus and Memory Transfers' },
          { id: 'u2d8t3', title: 'Arithmetic Microoperations' },
          { id: 'u2d8t4', title: 'Logic & Shift Microoperations' },
        ],
      },
      {
        day: 9,
        title: 'Basic Computer Organization & Assembly Programming',
        topics: [
          { id: 'u2d9t1', title: 'Stored Program Organization & Instruction Codes' },
          { id: 'u2d9t2', title: 'Computer Registers & Instructions' },
          { id: 'u2d9t3', title: 'Timing, Control & Instruction Cycle' },
          { id: 'u2d9t4', title: 'Memory-Reference Instructions & I/O, Interrupt' },
          { id: 'u2d9t5', title: 'Machine Language & Assembly Language' },
          { id: 'u2d9t6', title: 'Assembler, Program Loops, Subroutines' },
          { id: 'u2d9t7', title: 'Input-Output Programming' },
        ],
      },
      {
        day: 10,
        title: 'Microprogrammed Control, CPU Organization',
        topics: [
          { id: 'u2d10t1', title: 'Control Memory & Address Sequencing' },
          { id: 'u2d10t2', title: 'Design of Control Unit' },
          { id: 'u2d10t3', title: 'General Register Organization & Stack Organization' },
          { id: 'u2d10t4', title: 'Instruction Formats & Addressing Modes' },
          { id: 'u2d10t5', title: 'RISC vs CISC Computer' },
        ],
      },
      {
        day: 11,
        title: 'Pipeline & Vector Processing, I/O Organization',
        topics: [
          { id: 'u2d11t1', title: 'Parallel Processing & Pipelining' },
          { id: 'u2d11t2', title: 'Arithmetic & Instruction Pipeline' },
          { id: 'u2d11t3', title: 'Vector Processing & Array Processors' },
          { id: 'u2d11t4', title: 'Peripheral Devices & I/O Interface' },
          { id: 'u2d11t5', title: 'Asynchronous Data Transfer & Modes of Transfer' },
          { id: 'u2d11t6', title: 'Priority Interrupt, DMA, Serial Communication' },
        ],
      },
      {
        day: 12,
        title: 'Memory Hierarchy, Multiprocessors',
        topics: [
          { id: 'u2d12t1', title: 'Main Memory & Auxiliary Memory' },
          { id: 'u2d12t2', title: 'Associative Memory & Cache Memory' },
          { id: 'u2d12t3', title: 'Virtual Memory & Memory Management Hardware' },
          { id: 'u2d12t4', title: 'Multiprocessor Characteristics & Interconnection' },
          { id: 'u2d12t5', title: 'Interprocessor Arbitration, Communication & Synchronization' },
          { id: 'u2d12t6', title: 'Cache Coherence & Multicore Processors' },
        ],
      },
    ],
    syllabusTopics: [
      'Digital Logic Circuits: Logic Gates, Boolean Algebra, Map Simplifications, Combinational Circuits, Flip-Flops, Sequential Circuits, ICs, Decoders, Multiplexers, Registers, Counters, Memory Unit',
      'Data Representation: Data Types, Number Systems, Complements, Fixed/Floating Point, Error Detection, Computer Arithmetic',
      'Register Transfer & Microoperations: RTL, Bus/Memory Transfers, Arithmetic/Logic/Shift Microoperations',
      'Basic Computer Organization: Stored Program, Instruction Codes, Registers, Instructions, Timing/Control, Instruction Cycle, Memory-Reference, I/O, Interrupt',
      'Programming the Basic Computer: Machine/Assembly Language, Assembler, Loops, Subroutines, I/O Programming',
      'Microprogrammed Control: Control Memory, Address Sequencing, Control Unit Design',
      'CPU: Register/Stack Organization, Instruction Formats, Addressing Modes, RISC/CISC',
      'Pipeline & Vector Processing: Parallel Processing, Pipelining, Vector Processing, Array Processors',
      'I/O Organization: Peripheral Devices, I/O Interface, Async Data Transfer, Priority Interrupt, DMA, Serial Communication',
      'Memory Hierarchy: Main/Auxiliary/Associative/Cache/Virtual Memory, Memory Management Hardware',
      'Multiprocessors: Interconnection, Arbitration, Communication, Synchronization, Cache Coherence, Multicore',
    ],
  },
  {
    unit: 3,
    title: 'Programming Languages & Computer Graphics',
    days: [
      {
        day: 13,
        title: 'Language Design, Elementary Data Types',
        topics: [
          { id: 'u3d13t1', title: 'Programming Language Concepts, Paradigms & Models' },
          { id: 'u3d13t2', title: 'Programming Environments & Virtual Computers' },
          { id: 'u3d13t3', title: 'Binding Times & Language Syntax' },
          { id: 'u3d13t4', title: 'Stages in Translation & Formal Transition Models' },
          { id: 'u3d13t5', title: 'Properties of Types & Objects' },
          { id: 'u3d13t6', title: 'Scalar & Composite Data Types' },
        ],
      },
      {
        day: 14,
        title: 'Programming in C (basics, pointers, files)',
        topics: [
          { id: 'u3d14t1', title: 'Tokens, Identifiers & Data Types in C' },
          { id: 'u3d14t2', title: 'Sequence Control & Subprogram Control' },
          { id: 'u3d14t3', title: 'Arrays, Structures, Union & Strings' },
          { id: 'u3d14t4', title: 'Pointers & Functions' },
          { id: 'u3d14t5', title: 'File Handling & Command Line Arguments' },
          { id: 'u3d14t6', title: 'Preprocessors' },
        ],
      },
      {
        day: 15,
        title: 'Object-Oriented Programming & C++ concepts',
        topics: [
          { id: 'u3d15t1', title: 'OOP: Class, Object, Instantiation, Inheritance' },
          { id: 'u3d15t2', title: 'Encapsulation, Abstract Class, Polymorphism' },
          { id: 'u3d15t3', title: 'C++: Tokens, Variables, Constants, Data Types, Operators' },
          { id: 'u3d15t4', title: 'C++: Control Statements, Functions, Parameter Passing' },
          { id: 'u3d15t5', title: 'C++: Virtual Functions, Constructors, Destructors' },
          { id: 'u3d15t6', title: 'C++: Overloading, Inheritance, Templates' },
          { id: 'u3d15t7', title: 'C++: Exception/Event Handling, Streams, Files, Multifile Programs' },
        ],
      },
      {
        day: 16,
        title: 'Web Programming (HTML, XML, Java, Servlets)',
        topics: [
          { id: 'u3d16t1', title: 'HTML & DHTML' },
          { id: 'u3d16t2', title: 'XML & Scripting' },
          { id: 'u3d16t3', title: 'Java Basics' },
          { id: 'u3d16t4', title: 'Servlets & Applets' },
        ],
      },
      {
        day: 17,
        title: 'Computer Graphics (2D algorithms, transformations)',
        topics: [
          { id: 'u3d17t1', title: 'Video-Display Devices, Raster-Scan & Random-Scan Systems' },
          { id: 'u3d17t2', title: 'Graphics Monitors & Input Devices' },
          { id: 'u3d17t3', title: 'Line Drawing Algorithms (DDA, Bresenham)' },
          { id: 'u3d17t4', title: 'Mid-Point Circle & Ellipse Algorithms' },
          { id: 'u3d17t5', title: 'Scan Line Polygon Fill, Boundary-Fill & Flood-Fill' },
        ],
      },
      {
        day: 18,
        title: '3D Graphics, Rendering, Viewing Pipeline',
        topics: [
          { id: 'u3d18t1', title: '2D Transforms: Translation, Scaling, Rotation, Reflection, Shear' },
          { id: 'u3d18t2', title: 'Matrix Representations & Homogeneous Coordinates' },
          { id: 'u3d18t3', title: 'Composite Transforms & Coordinate System Transformations' },
          { id: 'u3d18t4', title: 'Viewing Pipeline & Viewing Coordinate Reference Frame' },
          { id: 'u3d18t5', title: 'Window to View-Port Transformation & Viewing Functions' },
          { id: 'u3d18t6', title: 'Line & Polygon Clipping Algorithms' },
        ],
      },
    ],
    syllabusTopics: [
      'Language Design: Concepts, Paradigms, Models, Environments, Virtual Computers, Binding Times, Syntax, Stages in Translation, Formal Transition Models',
      'Elementary Data Types: Properties of Types/Objects, Scalar & Composite Data Types',
      'Programming in C: Tokens, Identifiers, Data Types, Sequence Control, Arrays, Structures, Pointers, Functions, File Handling, Preprocessors',
      'OOP: Class, Object, Instantiation, Inheritance, Encapsulation, Abstract Class, Polymorphism',
      'C++: Tokens, Variables, Data Types, Operators, Control, Functions, Virtual Functions, Constructors/Destructors, Overloading, Templates, Exception Handling, Streams/Files',
      'Web Programming: HTML, DHTML, XML, Scripting, Java, Servlets, Applets',
      'Computer Graphics: Video-Display Devices, Raster/Random-Scan, Line Drawing, Mid-Point Circle/Ellipse, Scan Line, Boundary/Flood Fill',
      '2D Transforms & Viewing: Translation, Scaling, Rotation, Reflection, Shear, Homogeneous Coordinates, Viewing Pipeline, Clipping Algorithms',
    ],
  },
  {
    unit: 4,
    title: 'Database Management Systems',
    days: [
      {
        day: 19,
        title: 'DBMS Concepts, Data Models, ER Diagrams',
        topics: [
          { id: 'u4d19t1', title: 'Data Models, Schemas & Instances' },
          { id: 'u4d19t2', title: 'Three-Schema Architecture & Data Independence' },
          { id: 'u4d19t3', title: 'Database Languages & Interfaces' },
          { id: 'u4d19t4', title: 'Centralized & Client/Server Architectures' },
          { id: 'u4d19t5', title: 'Entity-Relationship Diagram' },
          { id: 'u4d19t6', title: 'Relational Model — Constraints, Languages, Design' },
        ],
      },
      {
        day: 20,
        title: 'Relational Algebra, SQL basics',
        topics: [
          { id: 'u4d20t1', title: 'Relational Database Schemas & Update Operations' },
          { id: 'u4d20t2', title: 'Relational Algebra & Relational Calculus' },
          { id: 'u4d20t3', title: 'Codd Rules' },
          { id: 'u4d20t4', title: 'SQL: Data Definition & Data Types' },
          { id: 'u4d20t5', title: 'SQL: Constraints, Queries, Insert/Delete/Update' },
          { id: 'u4d20t6', title: 'SQL: Views, Stored Procedures, Functions, Triggers' },
          { id: 'u4d20t7', title: 'SQL Injection Awareness' },
        ],
      },
      {
        day: 21,
        title: 'Normalization, Query Optimization, Transactions',
        topics: [
          { id: 'u4d21t1', title: 'Functional Dependencies & Normalization (1NF-BCNF)' },
          { id: 'u4d21t2', title: 'Algorithms for Query Processing & Optimization' },
          { id: 'u4d21t3', title: 'Transaction Processing & Concurrency Control' },
          { id: 'u4d21t4', title: 'Database Recovery Techniques' },
          { id: 'u4d21t5', title: 'Object and Object-Relational Databases' },
          { id: 'u4d21t6', title: 'Database Security & Authorization' },
        ],
      },
      {
        day: 22,
        title: 'Advanced Data Models (XML, GIS, Multimedia DBs)',
        topics: [
          { id: 'u4d22t1', title: 'Temporal Database Concepts' },
          { id: 'u4d22t2', title: 'Multimedia Databases' },
          { id: 'u4d22t3', title: 'Deductive Databases' },
          { id: 'u4d22t4', title: 'XML and Internet Databases' },
          { id: 'u4d22t5', title: 'Mobile Databases & Geographic Information Systems' },
          { id: 'u4d22t6', title: 'Genome Data Management' },
          { id: 'u4d22t7', title: 'Distributed Databases & Client-Server Architectures' },
        ],
      },
      {
        day: 23,
        title: 'Data Warehousing, Data Mining techniques',
        topics: [
          { id: 'u4d23t1', title: 'Data Modeling for Data Warehouses & Concept Hierarchy' },
          { id: 'u4d23t2', title: 'OLAP and OLTP' },
          { id: 'u4d23t3', title: 'Association Rules & Classification' },
          { id: 'u4d23t4', title: 'Clustering, Regression, SVM, K-NN' },
          { id: 'u4d23t5', title: 'Hidden Markov Model & Summarization' },
          { id: 'u4d23t6', title: 'Dependency Modeling, Link Analysis, Sequencing' },
          { id: 'u4d23t7', title: 'Social Network Analysis' },
        ],
      },
      {
        day: 24,
        title: 'Big Data, Hadoop, NOSQL',
        topics: [
          { id: 'u4d24t1', title: 'Big Data Characteristics & Types' },
          { id: 'u4d24t2', title: 'Big Data Architecture & MapReduce' },
          { id: 'u4d24t3', title: 'Hadoop & Distributed File System (HDFS)' },
          { id: 'u4d24t4', title: 'NOSQL Concepts & Query Optimization' },
          { id: 'u4d24t5', title: 'Different NOSQL Products' },
          { id: 'u4d24t6', title: 'Indexing, Ordering & NOSQL in Cloud' },
        ],
      },
    ],
    syllabusTopics: [
      'DBMS Concepts: Data Models, Schemas, Three-Schema Architecture, Data Independence, Database Languages, Client/Server Architecture',
      'Data Modeling: ER Diagram, Relational Model, Constraints, Relational Algebra/Calculus, Codd Rules',
      'SQL: DDL, DML, Constraints, Queries, Views, Stored Procedures, Triggers, SQL Injection',
      'Normalization: Functional Dependencies, Query Processing, Optimization, Transactions, Concurrency, Recovery, Object-Relational DBs, Security',
      'Enhanced Data Models: Temporal, Multimedia, Deductive, XML/Internet, Mobile, GIS, Genome, Distributed DBs',
      'Data Warehousing & Mining: OLAP, OLTP, Association Rules, Classification, Clustering, Regression, SVM, K-NN, HMM, Social Network Analysis',
      'Big Data: Characteristics, Architecture, MapReduce, Hadoop, HDFS',
      'NOSQL: Query Optimization, Products, Indexing, Cloud',
    ],
  },
  {
    unit: 5,
    title: 'System Software & Operating Systems',
    days: [
      {
        day: 25,
        title: 'System Software (Compilers, Linkers, Debuggers)',
        topics: [
          { id: 'u5d25t1', title: 'Machine, Assembly & High-Level Languages' },
          { id: 'u5d25t2', title: 'Compilers & Interpreters' },
          { id: 'u5d25t3', title: 'Loading, Linking & Relocation' },
          { id: 'u5d25t4', title: 'Macros & Debuggers' },
        ],
      },
      {
        day: 26,
        title: 'OS Basics, Process Management, Threads',
        topics: [
          { id: 'u5d26t1', title: 'OS Structure, Operations & Services' },
          { id: 'u5d26t2', title: 'System Calls, OS Design & Implementation' },
          { id: 'u5d26t3', title: 'System Boot' },
          { id: 'u5d26t4', title: 'Process Scheduling & Operations' },
          { id: 'u5d26t5', title: 'Interprocess Communication & Client-Server Communication' },
          { id: 'u5d26t6', title: 'Process Synchronization, Critical-Section, Peterson\'s, Semaphores' },
          { id: 'u5d26t7', title: 'Multicore Programming & Multithreading Models' },
          { id: 'u5d26t8', title: 'Thread Libraries, Implicit Threading & Threading Issues' },
        ],
      },
      {
        day: 27,
        title: 'CPU Scheduling, Deadlocks',
        topics: [
          { id: 'u5d27t1', title: 'Scheduling Criteria & Algorithms' },
          { id: 'u5d27t2', title: 'Thread Scheduling & Multiple-Processor Scheduling' },
          { id: 'u5d27t3', title: 'Real-Time CPU Scheduling' },
          { id: 'u5d27t4', title: 'Deadlock Characterization' },
          { id: 'u5d27t5', title: 'Deadlock Prevention, Avoidance & Detection' },
          { id: 'u5d27t6', title: 'Recovery from Deadlock' },
        ],
      },
      {
        day: 28,
        title: 'Memory Management (Paging, Segmentation, Virtual Memory)',
        topics: [
          { id: 'u5d28t1', title: 'Contiguous Memory Allocation & Swapping' },
          { id: 'u5d28t2', title: 'Paging & Segmentation' },
          { id: 'u5d28t3', title: 'Demand Paging & Page Replacement' },
          { id: 'u5d28t4', title: 'Allocation of Frames & Thrashing' },
          { id: 'u5d28t5', title: 'Memory-Mapped Files' },
        ],
      },
      {
        day: 29,
        title: 'Storage & File Systems',
        topics: [
          { id: 'u5d29t1', title: 'Mass-Storage Structure, Disk Scheduling & RAID' },
          { id: 'u5d29t2', title: 'File Access Methods & Directory Structure' },
          { id: 'u5d29t3', title: 'File-System Mounting, Sharing & Implementation' },
          { id: 'u5d29t4', title: 'Directory Implementation & Allocation Methods' },
          { id: 'u5d29t5', title: 'Free-Space Management, Efficiency & Recovery' },
          { id: 'u5d29t6', title: 'I/O Hardware, Application I/O Interface, Kernel I/O' },
        ],
      },
      {
        day: 30,
        title: 'Security, Virtual Machines, Linux & Windows OS',
        topics: [
          { id: 'u5d30t1', title: 'Protection, Access Matrix & Access Control' },
          { id: 'u5d30t2', title: 'Program Threats, System/Network Threats, Cryptography' },
          { id: 'u5d30t3', title: 'User Authentication & Security Defenses' },
          { id: 'u5d30t4', title: 'Virtual Machines: Types & Implementations, Virtualization' },
          { id: 'u5d30t5', title: 'Linux OS: Design, Kernel, Processes, Scheduling, Memory, FS' },
          { id: 'u5d30t6', title: 'Windows OS: Design, Components, Terminal Services, FS, Networking' },
          { id: 'u5d30t7', title: 'Distributed Systems: Types, Network Structure, Protocols, Robustness' },
        ],
      },
    ],
    syllabusTopics: [
      'System Software: Machine/Assembly/High-Level Languages, Compilers, Interpreters, Loading, Linking, Relocation, Macros, Debuggers',
      'OS Basics: Structure, Operations, Services, System Calls, Design, Boot',
      'Process Management: Scheduling, Operations, IPC, Synchronization, Critical-Section, Semaphores',
      'Threads: Multicore, Multithreading Models, Thread Libraries, Implicit Threading',
      'CPU Scheduling: Criteria, Algorithms, Thread/Multi-Processor/Real-Time Scheduling',
      'Deadlocks: Characterization, Prevention, Avoidance, Detection, Recovery',
      'Memory Management: Contiguous, Swapping, Paging, Segmentation, Demand Paging, Page Replacement, Thrashing',
      'Storage: Mass-Storage, Disk, RAID, File Access Methods, Directory, File-System Implementation, I/O',
      'Security: Protection, Access Matrix, Threats, Cryptography, Authentication',
      'Virtual Machines, Linux OS, Windows OS, Distributed Systems',
    ],
  },
  {
    unit: 6,
    title: 'Software Engineering',
    days: [
      {
        day: 31,
        title: 'Software Process Models (Agile, Scrum, XP)',
        topics: [
          { id: 'u6d31t1', title: 'Software Process & Generic Process Model' },
          { id: 'u6d31t2', title: 'Framework Activity, Task Set & Process Patterns' },
          { id: 'u6d31t3', title: 'Process Lifecycle & Prescriptive Process Models' },
          { id: 'u6d31t4', title: 'Component Based Development & Aspect-Oriented SD' },
          { id: 'u6d31t5', title: 'Formal Methods' },
          { id: 'u6d31t6', title: 'Agile: XP, Adaptive SD, Scrum, DSDM, FDD, Crystal' },
          { id: 'u6d31t7', title: 'Web Engineering' },
        ],
      },
      {
        day: 32,
        title: 'Requirements Engineering & SRS',
        topics: [
          { id: 'u6d32t1', title: 'Functional & Non-Functional Requirements' },
          { id: 'u6d32t2', title: 'Eliciting Requirements & Use Cases' },
          { id: 'u6d32t3', title: 'Requirement Analysis & Modelling' },
          { id: 'u6d32t4', title: 'Requirements Review' },
          { id: 'u6d32t5', title: 'Software Requirement & Specification (SRS) Document' },
        ],
      },
      {
        day: 33,
        title: 'Software Design (OO Design, UI, Architecture)',
        topics: [
          { id: 'u6d33t1', title: 'Abstraction, Architecture, Patterns' },
          { id: 'u6d33t2', title: 'Separation of Concerns, Modularity, Information Hiding' },
          { id: 'u6d33t3', title: 'Functional Independence, Cohesion & Coupling' },
          { id: 'u6d33t4', title: 'Object-Oriented Design & Data Design' },
          { id: 'u6d33t5', title: 'Architectural Design & User Interface Design' },
          { id: 'u6d33t6', title: 'Component Level Design' },
        ],
      },
      {
        day: 34,
        title: 'Software Quality, Estimation & Scheduling',
        topics: [
          { id: 'u6d34t1', title: 'McCall\'s & ISO 9126 Quality Factors' },
          { id: 'u6d34t2', title: 'Quality Control & Quality Assurance' },
          { id: 'u6d34t3', title: 'Risk Management & RMMM' },
          { id: 'u6d34t4', title: 'Software Reliability' },
          { id: 'u6d34t5', title: 'Software Sizing: LOC & FP based Estimations' },
          { id: 'u6d34t6', title: 'COCOMO & Estimation Models' },
          { id: 'u6d34t7', title: 'Project Scheduling, Staffing & Time-line Charts' },
        ],
      },
      {
        day: 35,
        title: 'Software Testing, SCM, Re-engineering',
        topics: [
          { id: 'u6d35t1', title: 'Verification & Validation' },
          { id: 'u6d35t2', title: 'Unit & Integration Testing' },
          { id: 'u6d35t3', title: 'White-box & Black-box Testing' },
          { id: 'u6d35t4', title: 'Basis Path Testing & Control Structure Testing' },
          { id: 'u6d35t5', title: 'Alpha, Beta, Regression, Performance & Stress Testing' },
          { id: 'u6d35t6', title: 'Software Configuration Management (Change/Version Control)' },
          { id: 'u6d35t7', title: 'Software Reuse, Re-engineering & Reverse Engineering' },
        ],
      },
    ],
    syllabusTopics: [
      'Software Process Models: Generic Model, Prescriptive Models, Agile (XP, Scrum, DSDM, FDD, Crystal), Web Engineering',
      'Software Requirements: Functional/Non-Functional, Elicitation, Use Cases, Analysis, Modelling, SRS',
      'Software Design: Abstraction, Architecture, Patterns, Modularity, Cohesion/Coupling, OO Design, UI Design',
      'Software Quality: McCall\'s, ISO 9126, QC, QA, Risk Management, Reliability',
      'Estimation & Scheduling: LOC, FP, COCOMO, Scheduling, Staffing, Time-line Charts',
      'Software Testing: V&V, Unit/Integration, White/Black-box, Path Testing, Regression, Performance, Stress Testing',
      'SCM: Change Control, Version Control, Reuse, Re-engineering, Reverse Engineering',
    ],
  },
  {
    unit: 7,
    title: 'Data Structures & Algorithms',
    days: [
      {
        day: 36,
        title: 'Arrays, Stacks, Queues, Linked Lists',
        topics: [
          { id: 'u7d36t1', title: 'Arrays & Applications, Sparse Matrix' },
          { id: 'u7d36t2', title: 'Stacks & Queues, Priority Queues' },
          { id: 'u7d36t3', title: 'Linked Lists (Singly, Doubly, Circular)' },
          { id: 'u7d36t4', title: 'Data Structure for Sets' },
          { id: 'u7d36t5', title: 'Hashing' },
        ],
      },
      {
        day: 37,
        title: 'Trees (Binary, AVL, B-Trees)',
        topics: [
          { id: 'u7d37t1', title: 'Trees, Forest & Binary Tree' },
          { id: 'u7d37t2', title: 'Threaded Binary Tree & Binary Search Tree' },
          { id: 'u7d37t3', title: 'AVL Tree' },
          { id: 'u7d37t4', title: 'B Tree, B+ Tree, B* Tree' },
        ],
      },
      {
        day: 38,
        title: 'Graphs, Sorting & Searching',
        topics: [
          { id: 'u7d38t1', title: 'Graph Representations & Traversals' },
          { id: 'u7d38t2', title: 'Sorting Algorithms (Bubble, Merge, Quick, Heap, Radix)' },
          { id: 'u7d38t3', title: 'Searching Algorithms (Linear, Binary, Interpolation)' },
        ],
      },
      {
        day: 39,
        title: 'Algorithm Analysis, Recurrences, Design Techniques',
        topics: [
          { id: 'u7d39t1', title: 'Time & Space Complexities' },
          { id: 'u7d39t2', title: 'Asymptotic Notation (Big-O, Omega, Theta)' },
          { id: 'u7d39t3', title: 'Recurrence Relations (Master Theorem)' },
          { id: 'u7d39t4', title: 'Divide and Conquer' },
          { id: 'u7d39t5', title: 'Dynamic Programming' },
          { id: 'u7d39t6', title: 'Greedy Algorithms' },
          { id: 'u7d39t7', title: 'Backtracking & Branch and Bound' },
        ],
      },
      {
        day: 40,
        title: 'Graph Algorithms, Complexity Theory',
        topics: [
          { id: 'u7d40t1', title: 'BFS & DFS' },
          { id: 'u7d40t2', title: 'Shortest Paths (Dijkstra, Bellman-Ford, Floyd-Warshall)' },
          { id: 'u7d40t3', title: 'Maximum Flow (Ford-Fulkerson)' },
          { id: 'u7d40t4', title: 'Minimum Spanning Trees (Kruskal, Prim)' },
          { id: 'u7d40t5', title: 'Lower Bound Theory & Comparison Trees' },
          { id: 'u7d40t6', title: 'P & NP Class Problems' },
          { id: 'u7d40t7', title: 'NP-completeness & Reducibility' },
        ],
      },
      {
        day: 41,
        title: 'Advanced Algorithms (FFT, String Matching, Randomized)',
        topics: [
          { id: 'u7d41t1', title: 'Number Theoretic Algorithms' },
          { id: 'u7d41t2', title: 'Polynomial Arithmetic & Fast Fourier Transform' },
          { id: 'u7d41t3', title: 'String Matching Algorithms (KMP, Rabin-Karp)' },
          { id: 'u7d41t4', title: 'Parallel Algorithms for Sorting, Searching & Merging' },
          { id: 'u7d41t5', title: 'Approximation Algorithms' },
          { id: 'u7d41t6', title: 'Randomized Algorithms' },
        ],
      },
    ],
    syllabusTopics: [
      'Data Structures: Arrays, Sparse Matrix, Stacks, Queues, Priority Queues, Linked Lists',
      'Trees: Binary, Threaded, BST, AVL, B/B+/B* Tree, Forest',
      'Graphs, Sorting & Searching Algorithms, Hashing',
      'Performance Analysis: Time/Space Complexity, Asymptotic Notation, Recurrence Relations',
      'Design Techniques: Divide & Conquer, Dynamic Programming, Greedy, Backtracking, Branch & Bound',
      'Graph Algorithms: BFS, DFS, Shortest Paths, Maximum Flow, MST',
      'Lower Bound Theory, Complexity Theory: P, NP, NP-completeness',
      'Selected Topics: Number Theoretic Algorithms, FFT, String Matching',
      'Advanced: Parallel Algorithms, Approximation, Randomized Algorithms',
    ],
  },
  {
    unit: 8,
    title: 'Theory of Computation & Compilers',
    days: [
      {
        day: 42,
        title: 'Formal Languages, DFA, NFA, Regular Expressions',
        topics: [
          { id: 'u8d42t1', title: 'Formal Language & Non-Computational Problems' },
          { id: 'u8d42t2', title: 'Diagonal Argument & Russell\'s Paradox' },
          { id: 'u8d42t3', title: 'DFA & NFA, Equivalence of DFA and NFA' },
          { id: 'u8d42t4', title: 'Regular Languages & Regular Grammars' },
          { id: 'u8d42t5', title: 'Regular Expressions' },
          { id: 'u8d42t6', title: 'Properties of Regular Language & Pumping Lemma' },
          { id: 'u8d42t7', title: 'Lexical Analysis' },
        ],
      },
      {
        day: 43,
        title: 'Context-Free Grammars, PDA, Ambiguity',
        topics: [
          { id: 'u8d43t1', title: 'Pushdown Automaton (PDA) & NPDA' },
          { id: 'u8d43t2', title: 'Context Free Grammar' },
          { id: 'u8d43t3', title: 'Chomsky Normal Form & Greibach Normal Form' },
          { id: 'u8d43t4', title: 'Ambiguity & Parse Tree / Derivation Trees' },
          { id: 'u8d43t5', title: 'Equivalence of PDA\'s and CFGs' },
          { id: 'u8d43t6', title: 'Properties of Context Free Language' },
        ],
      },
      {
        day: 44,
        title: 'Turing Machines, Chomsky Hierarchy',
        topics: [
          { id: 'u8d44t1', title: 'Standard Turing Machine & Variations' },
          { id: 'u8d44t2', title: 'Universal Turing Machine' },
          { id: 'u8d44t3', title: 'Models of Computation & Church-Turing Thesis' },
          { id: 'u8d44t4', title: 'Recursive & Recursively-Enumerable Languages' },
          { id: 'u8d44t5', title: 'Context-Sensitive Languages & Unrestricted Grammars' },
          { id: 'u8d44t6', title: 'Chomsky Hierarchy of Languages' },
          { id: 'u8d44t7', title: 'Construction of TM for Simple Problems' },
        ],
      },
      {
        day: 45,
        title: 'Unsolvable Problems, Complexity Classes',
        topics: [
          { id: 'u8d45t1', title: 'Unsolvable Problems & Halting Problem' },
          { id: 'u8d45t2', title: 'Post Correspondence Problem' },
          { id: 'u8d45t3', title: 'Unsolvable Problems for Context-Free Languages' },
          { id: 'u8d45t4', title: 'Measuring & Classifying Complexity' },
          { id: 'u8d45t5', title: 'Tractable & Intractable Problems' },
        ],
      },
      {
        day: 46,
        title: 'Syntax & Semantic Analysis',
        topics: [
          { id: 'u8d46t1', title: 'Associativity, Precedence & Grammar Transformations' },
          { id: 'u8d46t2', title: 'Top Down Parsing & Recursive Descent Predictive Parsing' },
          { id: 'u8d46t3', title: 'LL(1) Parsing' },
          { id: 'u8d46t4', title: 'Bottom up Parsing, LR Parser, LALR(1) Parser' },
          { id: 'u8d46t5', title: 'Attribute Grammar & Syntax Directed Definitions' },
          { id: 'u8d46t6', title: 'Inherited/Synthesized Attributes, Dependency Graph' },
          { id: 'u8d46t7', title: 'S-attributed & L-attributed Definitions, Type-Checking' },
          { id: 'u8d46t8', title: 'Run Time System: Storage, Activation Records, Symbol Table' },
        ],
      },
      {
        day: 47,
        title: 'Code Generation & Optimization',
        topics: [
          { id: 'u8d47t1', title: 'Intermediate Representations' },
          { id: 'u8d47t2', title: 'Translation of Declarations, Assignments, Control Flow' },
          { id: 'u8d47t3', title: 'Boolean Expressions & Procedure Calls Translation' },
          { id: 'u8d47t4', title: 'Control-flow & Data-flow Analysis' },
          { id: 'u8d47t5', title: 'Local & Global Optimization' },
          { id: 'u8d47t6', title: 'Loop Optimization & Peep-Hole Optimization' },
          { id: 'u8d47t7', title: 'Instruction Scheduling' },
        ],
      },
    ],
    syllabusTopics: [
      'Theory of Computation: Formal Language, Non-Computational Problems, Diagonal Argument, Russell\'s Paradox',
      'Regular Languages: DFA, NFA, Equivalence, Regular Grammars/Expressions, Pumping Lemma, Lexical Analysis',
      'Context Free Language: PDA, NPDA, CFG, CNF, GNF, Ambiguity, Parse Trees, Properties',
      'Turing Machines: Standard/Variations, Universal TM, Church-Turing Thesis, Recursive/RE Languages, Chomsky Hierarchy',
      'Unsolvable Problems: Halting Problem, PCP, Complexity Classes, Tractable/Intractable',
      'Syntax Analysis: Top Down/Bottom Up Parsing, LL(1), LR, LALR(1)',
      'Semantic Analysis: Attribute Grammar, Syntax Directed Definitions, Type-Checking, Run Time System',
      'Intermediate Code Generation: Representations, Translation of Declarations/Assignments/Control Flow',
      'Code Generation & Optimization: Control/Data-flow Analysis, Local/Global/Loop/Peep-Hole Optimization',
    ],
  },
  {
    unit: 9,
    title: 'Data Communication & Computer Networks',
    days: [
      {
        day: 48,
        title: 'Data Communication basics, Transmission Media',
        topics: [
          { id: 'u9d48t1', title: 'Components of Data Communication System' },
          { id: 'u9d48t2', title: 'Simplex, Half-Duplex & Duplex Communication' },
          { id: 'u9d48t3', title: 'Analog/Digital Signals, Noiseless/Noisy Channels' },
          { id: 'u9d48t4', title: 'Bandwidth, Throughput & Latency' },
          { id: 'u9d48t5', title: 'Digital/Analog Transmission, Encoding & Modulation' },
          { id: 'u9d48t6', title: 'Broadband/Baseband Transmission & Multiplexing' },
          { id: 'u9d48t7', title: 'Transmission Media, Errors & Error Handling' },
        ],
      },
      {
        day: 49,
        title: 'Network Topologies, OSI & TCP/IP Models',
        topics: [
          { id: 'u9d49t1', title: 'Network Topologies: LAN, MAN, WAN, Wireless, Internet' },
          { id: 'u9d49t2', title: 'Layered Architecture & OSI Reference Model' },
          { id: 'u9d49t3', title: 'TCP/IP Protocol Suite' },
          { id: 'u9d49t4', title: 'Physical, Logical, Port & Specific Addresses' },
          { id: 'u9d49t5', title: 'Switching Techniques' },
          { id: 'u9d49t6', title: 'Framing, Error Detection & Correction' },
          { id: 'u9d49t7', title: 'Flow/Error Control, Sliding Window, HDLC' },
          { id: 'u9d49t8', title: 'Multiple Access: CSMA/CD, CSMA/CA, Token Passing, FDMA, CDMA, TDMA' },
        ],
      },
      {
        day: 50,
        title: 'IPv4, IPv6, Routing Algorithms',
        topics: [
          { id: 'u9d50t1', title: 'IPv4 Structure, Address Space, Classful/Classless' },
          { id: 'u9d50t2', title: 'Datagram, Fragmentation & Checksum' },
          { id: 'u9d50t3', title: 'IPv6 Packet Format' },
          { id: 'u9d50t4', title: 'ARP: Mapping Logical to Physical Address' },
          { id: 'u9d50t5', title: 'Direct & Indirect Network Layer Delivery' },
          { id: 'u9d50t6', title: 'Routing Algorithms' },
          { id: 'u9d50t7', title: 'TCP, UDP & SCTP Protocols' },
          { id: 'u9d50t8', title: 'Flow Control, Error Control & Congestion Control' },
        ],
      },
      {
        day: 51,
        title: 'WWW, Email Protocols, FTP, TELNET',
        topics: [
          { id: 'u9d51t1', title: 'URL & Domain Name Service (DNS)' },
          { id: 'u9d51t2', title: 'DNS Resolution — Name/Address Mapping' },
          { id: 'u9d51t3', title: 'Electronic Mail Architecture' },
          { id: 'u9d51t4', title: 'SMTP, POP & IMAP' },
          { id: 'u9d51t5', title: 'TELNET & FTP' },
        ],
      },
      {
        day: 52,
        title: 'Network Security (Cryptography, Firewalls, VPNs)',
        topics: [
          { id: 'u9d52t1', title: 'Malwares' },
          { id: 'u9d52t2', title: 'Cryptography & Steganography' },
          { id: 'u9d52t3', title: 'Secret-Key & Public-Key Algorithms' },
          { id: 'u9d52t4', title: 'Digital Signature' },
          { id: 'u9d52t5', title: 'Virtual Private Networks & Firewalls' },
        ],
      },
      {
        day: 53,
        title: 'Mobile Technology, Cloud Computing, IoT',
        topics: [
          { id: 'u9d53t1', title: 'GSM & CDMA: Services & Architecture' },
          { id: 'u9d53t2', title: 'Mobile Computing, Middleware & Gateway' },
          { id: 'u9d53t3', title: 'Mobile IP & Communication Protocol' },
          { id: 'u9d53t4', title: 'Communication Satellites, Wireless Networks & Topologies' },
          { id: 'u9d53t5', title: 'Cellular Topology, Mobile Ad-hoc Networks, Wireless LANs' },
          { id: 'u9d53t6', title: 'GPRS & SMS' },
          { id: 'u9d53t7', title: 'Cloud Computing: SaaS, PaaS, IaaS, Public/Private Cloud' },
          { id: 'u9d53t8', title: 'Virtualization, Cloud Storage, Resource Management, SLA' },
          { id: 'u9d53t9', title: 'Basics of IoT' },
        ],
      },
    ],
    syllabusTopics: [
      'Data Communication: Components, Modes, Signals, Channels, Bandwidth, Transmission, Encoding, Multiplexing, Error Handling',
      'Computer Networks: Topologies, LAN, MAN, WAN, Wireless, Internet',
      'Network Models: OSI, TCP/IP, Addresses, Switching Techniques',
      'OSI/TCP Functions: Framing, Error Detection/Correction, Flow Control, Sliding Window, Multiple Access Protocols',
      'IPv4/IPv6: Structure, Addressing, Datagram, Fragmentation, ARP, Routing Algorithms, TCP/UDP/SCTP',
      'WWW: URL, DNS, Email (SMTP, POP, IMAP), TELNET, FTP',
      'Network Security: Malwares, Cryptography, Steganography, Digital Signature, VPNs, Firewalls',
      'Mobile Technology: GSM, CDMA, Mobile Computing, Mobile IP, Wireless Networks, GPRS',
      'Cloud Computing & IoT: SaaS, PaaS, IaaS, Virtualization, Cloud Storage, IoT',
    ],
  },
  {
    unit: 10,
    title: 'Artificial Intelligence',
    days: [
      {
        day: 54,
        title: 'Approaches to AI, Heuristic Search, Game Playing',
        topics: [
          { id: 'u10d54t1', title: 'Turing Test & Rational Agent Approaches' },
          { id: 'u10d54t2', title: 'State Space Representation of Problems' },
          { id: 'u10d54t3', title: 'Heuristic Search Techniques' },
          { id: 'u10d54t4', title: 'Game Playing' },
          { id: 'u10d54t5', title: 'Min-Max Search & Alpha-Beta Cutoff' },
        ],
      },
      {
        day: 55,
        title: 'Knowledge Representation, Expert Systems',
        topics: [
          { id: 'u10d55t1', title: 'Logic-based Knowledge Representation' },
          { id: 'u10d55t2', title: 'Semantic Networks & Frames' },
          { id: 'u10d55t3', title: 'Rules, Scripts, Conceptual Dependency & Ontologies' },
          { id: 'u10d55t4', title: 'Expert Systems' },
          { id: 'u10d55t5', title: 'Handling Uncertainty in Knowledge' },
        ],
      },
      {
        day: 56,
        title: 'Planning Systems, NLP basics',
        topics: [
          { id: 'u10d56t1', title: 'Components of a Planning System' },
          { id: 'u10d56t2', title: 'Linear & Non-Linear Planning' },
          { id: 'u10d56t3', title: 'Goal Stack Planning & Hierarchical Planning' },
          { id: 'u10d56t4', title: 'STRIPS & Partial Order Planning' },
          { id: 'u10d56t5', title: 'NLP: Grammar & Language' },
          { id: 'u10d56t6', title: 'Parsing Techniques, Semantic Analysis & Pragmatics' },
        ],
      },
      {
        day: 57,
        title: 'Multi-Agent Systems, Semantic Web',
        topics: [
          { id: 'u10d57t1', title: 'Agents and Objects, Agents and Expert Systems' },
          { id: 'u10d57t2', title: 'Generic Structure of Multiagent System' },
          { id: 'u10d57t3', title: 'Semantic Web' },
          { id: 'u10d57t4', title: 'Agent Communication & Knowledge Sharing via Ontologies' },
          { id: 'u10d57t5', title: 'Agent Development Tools' },
        ],
      },
      {
        day: 58,
        title: 'Fuzzy Sets, Fuzzy Logic, Fuzzy Control',
        topics: [
          { id: 'u10d58t1', title: 'Notion of Fuzziness & Membership Functions' },
          { id: 'u10d58t2', title: 'Fuzzification & Defuzzification' },
          { id: 'u10d58t3', title: 'Operations on Fuzzy Sets' },
          { id: 'u10d58t4', title: 'Fuzzy Functions & Linguistic Variables' },
          { id: 'u10d58t5', title: 'Fuzzy Relations, Rules & Inference' },
          { id: 'u10d58t6', title: 'Fuzzy Control System & Fuzzy Rule Based Systems' },
        ],
      },
      {
        day: 59,
        title: 'Genetic Algorithms (GA)',
        topics: [
          { id: 'u10d59t1', title: 'Encoding Strategies' },
          { id: 'u10d59t2', title: 'Genetic Operators (Selection, Crossover, Mutation)' },
          { id: 'u10d59t3', title: 'Fitness Functions & GA Cycle' },
          { id: 'u10d59t4', title: 'Problem Solving using GA' },
        ],
      },
      {
        day: 60,
        title: 'Artificial Neural Networks (ANN)',
        topics: [
          { id: 'u10d60t1', title: 'Supervised, Unsupervised & Reinforcement Learning' },
          { id: 'u10d60t2', title: 'Single Perceptron' },
          { id: 'u10d60t3', title: 'Multi Layer Perceptron' },
          { id: 'u10d60t4', title: 'Self Organizing Maps' },
          { id: 'u10d60t5', title: 'Hopfield Network' },
        ],
      },
    ],
    syllabusTopics: [
      'Approaches to AI: Turing Test, Rational Agent, State Space, Heuristic Search, Game Playing, Min-Max, Alpha-Beta Cutoff',
      'Knowledge Representation: Logic, Semantic Networks, Frames, Rules, Scripts, Ontologies, Expert Systems, Uncertainty',
      'Planning: Linear/Non-Linear Planning, Goal Stack, Hierarchical, STRIPS, Partial Order Planning',
      'NLP: Grammar, Language, Parsing, Semantic Analysis, Pragmatics',
      'Multi Agent Systems: Agents, Expert Systems, Multiagent Structure, Semantic Web, Communication, Ontologies',
      'Fuzzy Sets: Membership Functions, Fuzzification, Defuzzification, Fuzzy Operations/Functions/Variables/Relations/Rules/Inference/Control',
      'Genetic Algorithms: Encoding, Genetic Operators, Fitness Functions, GA Cycle, Problem Solving',
      'ANN: Supervised/Unsupervised/Reinforcement Learning, Perceptron, MLP, Self Organizing Maps, Hopfield Network',
    ],
  },
];

// Helper to get all topic IDs for storage
export function getAllTopicIds(): string[] {
  const ids: string[] = [];
  for (const unit of STUDY_PLAN) {
    for (const day of unit.days) {
      for (const topic of day.topics) {
        ids.push(topic.id);
      }
    }
  }
  return ids;
}

// Helper to count totals
export function getStudyPlanStats(completedTopics: Record<string, boolean>) {
  let totalTopics = 0;
  let completedCount = 0;
  const unitStats: { unit: number; total: number; completed: number }[] = [];

  for (const unit of STUDY_PLAN) {
    let unitTotal = 0;
    let unitCompleted = 0;
    for (const day of unit.days) {
      for (const topic of day.topics) {
        totalTopics++;
        unitTotal++;
        if (completedTopics[topic.id]) {
          completedCount++;
          unitCompleted++;
        }
      }
    }
    unitStats.push({ unit: unit.unit, total: unitTotal, completed: unitCompleted });
  }

  return { totalTopics, completedCount, unitStats };
}
