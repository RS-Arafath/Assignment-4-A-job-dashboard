# Assignment - 4

## Answering  Questions

### 1. What is the difference between getElementById and getElementsByClassName, and querySelector / querySelectorAll?

getElementById(id)  
It selects a single element by its ID. It always returns one element.

getElementsByClassName(className)  
It selects multiple elements by their class name. It returns a live HTMLCollection, which means it updates automatically if the DOM changes.

querySelector(selector)  
It selects the first element that matches a CSS selector. It returns a single element.

querySelectorAll(selector)  
It selects all elements that match a CSS selector. It returns a static NodeList, which does not update automatically when the DOM changes.