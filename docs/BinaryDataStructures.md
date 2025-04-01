***Hierarchy of all types of arrays in Javascript and Node.js***

                            ┌──────────────────────────────────────────┐
                            │                 Object                 │
                            └──────────────────────────────────────────┘
                                         │
                                ┌─────────────────────────┐
                                │        Array            │
                                └─────────────────────────┘
                                         │
                               ┌────────┼────────┐
                               │                 │
                    ┌─────────────────┐    ┌──────────────────┐
                    │ Typed Arrays    │    │ Regular Arrays   │
                    └─────────────────┘    └──────────────────┘
                            │
                 ┌───────────┼──────────┐
                 │                       │
        ┌─────────────┐         ┌────────────────┐
        │ Uint8Array  │         │ Int8Array      │
        └─────────────┘         └────────────────┘
                 │                       │
        ┌──────────────┐        ┌──────────────────┐
        │ Uint16Array  │        │ Int16Array       │
        └──────────────┘        └──────────────────┘
                 │                       │
        ┌──────────────┐        ┌──────────────────┐
        │ Uint32Array  │        │ Int32Array       │
        └──────────────┘        └──────────────────┘
                 │                       │
        ┌──────────────┐        ┌──────────────────┐
        │ Float32Array │        │ Float64Array     │
        └──────────────┘        └──────────────────┘
                 │
        ┌────────────────┐
        │ ArrayBuffer    │  (base container for all Typed Arrays)
        └────────────────┘
                │
      ┌────────────────────┐
      │    DataView        │  (allows low-level access to ArrayBuffer)
      └────────────────────┘
                             │
                        ┌──────────┐
                        │   Buffer │  (Specific to Node.js, Buffer is a subclass of Uint8Array)
                        └──────────┘

***Key Clarifications***:

1. ***Array*** is a general-purpose, dynamic array in JavaScript that doesn't deal with raw binary data.

2. ***TypedArray*** serves as the common superclass of all TypedArray subclasses (Uint8Array, Int8Array etc)
- Think about %TypedArray% as an "abstract class" providing a common interface of utility methods for all typed array subclasses.
- This constructor is not directly exposed: there is no global TypedArray property. It is only accessible through Object.getPrototypeOf(Int8Array) and similar.
- All Typed Arrays are part of the JavaScript specification (ECMAScript).They can be used in both browsers and Node.js to handle binary data in JavaScript.
- Typed Arrays are not like regular JavaScript arrays (Array). Instead, they provide a view on an ArrayBuffer, which represents a block of memory in raw bytes.

3. ***Typed Arrays (like Uint8Array, Int8Array, etc.)*** - are views (specialized classes) that allow to interpret and manipulate the raw binary data stored in an ***ArrayBuffer*** in various formats ( as integers, floats, etc).
• For instance, Uint8Array treats each byte as an unsigned 8-bit integer.
• Float32Array treats every 4 bytes as a 32-bit floating point number.
- Typed Arrays are used for efficient manipulation of raw binary data. 
- Typed Arrays are not not subclasses of Array. 

4. ***ArrayBuffer*** is built-in JS object which is used to represent a generic fixed-length raw binary data buffer (represents a specific type of object in the ECMAScript specification).
- For practical purposes, you could consider it as a "built-in class-like" object.
- An ArrayBuffer is not an array in the way that a typical JavaScript Array is.
- It is just the low-level storage container for binary data, and specialized views are needed to interpret its content.
- The ArrayBuffer object is a part of the Web APIs and the JavaScript standard library.

5. ***Buffer*** - Exclusive to Node.js. In Node.js, Buffer is a built-in class specifically designed to handle raw binary data. It is a subclass of Uint8Array, but it has additional features and optimizations specific to handling I/O operations (like reading from files or network sockets) in Node.js.
- Buffer is a subclass of Uint8Array, so while they share many methods, some methods are not directly compatible between them

6. ***DataView*** - It is a Javascript Class which provides low-level interface for reading and writing different types of data (like integers, floats, etc.) from an ArrayBuffer at specific byte offsets, with support for byte-order (endianness).


***Diagram of TypedArray Relationship:***

                     ┌──────────────────────────┐
                     │        TypedArray        │   (Abstract type)
                     └──────────────────────────┘
                               ↑
              ┌────────────────────────────────────┐
              │          Concrete Classes        │
 ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
 │   Uint8Array     │  │    Int8Array     │  │   Float32Array   │
 └──────────────────┘  └──────────────────┘  └──────────────────┘

- TypedArray itself is an abstract base, not a class you can instantiate.

- The concrete classes like Uint8Array, Int8Array, Float64Array, etc., are the real classes that you can use in JavaScript.


### differeences between Buffer and Uint8Array (Typed array variation)

***Origin***:

1. Buffer: Exclusive to Node.js. It is an extension of Uint8Array that was designed to handle raw binary data efficiently. It’s specifically optimized for I/O operations like reading/writing to files, network communication, and streams.

1. Uint8Array: Part of the JavaScript specification (ECMAScript). It can be used in both browsers and Node.js to handle binary data in JavaScript.

***APIs and Features***:

2. Buffer:
- Contains many extra methods useful for I/O operations, such as Buffer.from(), Buffer.alloc(), Buffer.concat(), etc.

- Provides methods to convert between different encodings, such as toString() (with encoding options), write(), slice(), copy(), and others.

- More memory efficient in some cases, as it's optimized for binary data handling, especially in Node.js environments.

- The memory allocated for a Buffer is backed by raw memory outside of the JavaScript heap (which is managed by JS engine), which can make it more efficient for I/O.

2. Uint8Array:
- It is a part of the standard JavaScript API and has a more limited set of methods, mainly focused on array-like operations like set(), subarray(), slice(), etc.

- It works directly on the JavaScript heap, which can make it slightly less efficient for binary I/O operations compared to Buffer.

- It does not have the specialized I/O functions that Buffer does (e.g., Buffer.write(), Buffer.toString(), etc.).

***Memory Management***:

3. Buffer: 
- When you allocate a Buffer object, it is backed by raw memory, meaning it’s allocated outside of the V8 JavaScript heap.

- Buffer objects are more efficient when dealing with large amounts of binary data, especially in I/O-heavy operations (like network and file system operations), because they bypass some JavaScript engine overhead.

3. Uint8Array:
- Allocates memory on the JavaScript heap, which is managed by the V8 engine (in Node.js or browsers).

- Since Uint8Array operates within the JavaScript environment, it’s generally slower for raw I/O operations compared to Buffer in Node.js, especially for large binary data.

***Performance***:

4. Buffer:
- Generally more efficient for I/O-bound operations, especially in Node.js where binary data is frequently read and written from files or sent over the network.

- It uses a lower-level memory allocation mechanism to avoid some of the overhead associated with JavaScript heap allocation.

4. Uint8Array:
- Uint8Array is good for general-purpose use in JavaScript applications, including working with Web APIs, array-like operations, and binary data processing.

- It is slightly less performant than Buffer for raw binary I/O, but for most general use cases (outside of I/O-heavy work), it works just fine.

***Interaction Between Buffer and Uint8Array:***

- Since Buffer is a subclass of Uint8Array, you can use Uint8Array methods with Buffer objects. However, not all methods that exist on Buffer are available in Uint8Array.

For example:

5. Buffer has additional methods like Buffer.write(), Buffer.toString(), Buffer.alloc(), etc., which are not present on Uint8Array.

5. Uint8Array has methods like subarray() and set() that are also available for Buffer because Buffer inherits from Uint8Array.

Converting Between Buffer and Uint8Array:

Buffer to Uint8Array:
```js
const buffer = Buffer.from([1, 2, 3, 4]);
const uint8Array = new Uint8Array(buffer);
```

Uint8Array to Buffer:
```js
const uint8Array = new Uint8Array([1, 2, 3, 4]);
const buffer = Buffer.from(uint8Array);
```

***Practical Use Cases:***

6. Use Buffer when you are working with raw binary data that comes from I/O sources, such as reading from files, handling network streams, or dealing with binary protocols. For example, in Node.js when interacting with file systems, buffers are much more efficient.

6. Use Uint8Array for working with binary data in memory that doesn’t require specialized I/O operations. For instance, Uint8Array is useful for manipulating binary data in browsers, Web APIs, or in general JavaScript applications that don’t require raw memory access or I/O-bound performance optimizations.



***The relantionship***:

- ArrayBuffer is not a parent of TypedArray like Uint8Array. Instead, TypedArray classes, such as Uint8Array, are views on an ArrayBuffer. You can think of ArrayBuffer as a memory region that is accessed through views like Uint8Array.

- Buffer in Node.js is a special case where it is an extended form of Uint8Array with additional I/O-specific functionality.

***Practical example:***

1. ArrayBuffer provides a block of raw binary data.

2. Typed Arrays (such as Uint8Array) allow you to access and interpret this binary data as typed values (like bytes, integers, or floating points).

3. Buffer is an implementation of Uint8Array that provides extra features in Node.js, like working directly with streams, I/O operations, and file buffers.


***Sources:***
1. Array - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

2. TypedArray - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray

3. Data View - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView

4. ArrayBuffer - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
















