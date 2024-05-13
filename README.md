# workflow runner

Requirements:
Write a workflow runner that can accept the specification of a workflow in the form of a DAG
represented in JSON where letters are assigned to the vertices and numbers are assigned to
the edges. One node will be designated as the start vertex.

As the runner goes through the graph it should print the letter of each vertex it visits. Next, for
each edge e1 going out of a vertex wait t1 seconds before traveling to the connected vertex where t1 is the number that is tied to edge e1.

Note: The runner should process edges in parallel so that it starts the “timer” for each edge
going out of a vertex at the same time after printing the vertex letter. 

The runner should start by immediately printing A, then after 5 seconds print B, and then 2
seconds later print C. This graph, represented as JSON, would look something like:
{
"A": {"start": true, "edges": {"B": 5, "C": 7}},
"B": {"edges": {}},
"C": {"edges": {}}
}


Once you are ready to submit, you can respond to this email with an attachment or info on how to find your code on a site like GitHub.


Your solution will be evaluated based on the following criteria:
[] Application of Knowledge: The effectiveness of your knowledge in solving the challenge.
[] Code Quality and Efficiency: The quality, readability, and efficiency of your code.
[] Clarity of Documentation: How clear, complete, and well-organized the documentation
accompanying your solution is. This includes comments in the code, an explanation of
your approach, and any assumptions made.
[] Testing: The thoroughness of the tests added to the project, including whether they
cover critical code paths and input validation.


You are expected to deliver a set of artifacts for evaluation, including:
[] Runnable Software: Code, in the language of your choice, that delivers the requested
functionality.
[] Execution Method: A driver, main function, etc., that can execute test cases against
your code.
[] Tests: Demonstrations of the requested functionality.
[] A README File: This should contain instructions and/or tooling for executing (andbuilding, if applicable) your program, along with any documentation you deem important for understanding your approach, design, and choices.



Re: Coding Assignment

[] On DAG validation: Either make the assumption and list it in the README or validate that the input isn't a DAG.

[] Web interface.... is not required. However, it's up to you how you want to show off your skills. If you'd like to make the web interface and spend less time on, say, writing validation logic, that would be a way to save some time.


Q: Given that the prompt mentions JSON and not JS objects, should I assume I need to read a JSON file, or perhaps even have the user upload a JSON file if there’s a web user interface?
A: Yeah a JSON file. Though if you build a web interface 
  [] you could just accept JSON input. 


Q: Would “D” be printed the first time it is hit (after 8s), or three times total after 8, 9, and 12s?
My assumption would be the latter, but not sure.

A: It would be printed three times at the times you stated.




validation

The isGraphType function checks if a given object follows the pattern of a GraphType. Here's the pattern in plain English:

The object itself must be an object and not null.
Each key in the object represents a node in the graph. The key is a string and the value is a NodeType object.
A NodeType object must also be an object and not null. It has two properties:
start: A boolean indicating whether this node is the start node of the graph. There should be exactly one start node in the graph.
edges: An object where each key-value pair represents an edge from this node to another node. The key is a string representing the other node, and the value is a number representing the weight of the edge.
If the object doesn't follow this pattern, the function will throw an error with a message explaining what's wrong.
If the object does follow this pattern, the function will return true.




would improve:
- disable button while task runner is in progress, or rename it to "reset"
- show a visualization of the graphs