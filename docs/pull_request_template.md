When reviewing another developers work please ensure the following bullet points are considered when completing your review.

General

- Is this PR dependent on any other PRs before it can be merged?
- Does the feature submitted work? this can be against mocks if BE work has not been completed
- Is the code easy to understand / readable?
- Does the code make use of ES6+, const, let, arrow functions etc.
- are JSDoc comments included for methods / functions?
- Does the code stick to current conventions in the project? (eg. following container / presentation pattern, if this what the rest of the project uses)
- is the code DRY? (code generally shouldn't be repeated more than twice).
- Does the code follow current standards and pass lint tests?
- Confirm the UI has been tested across each of the major browsers IE, Edge, Firefox, Chrome and Safari before being sent to QA.

React

- Have functional components been used where state is not required?
- Do components have defined propTypes?
- No API calls in containers, these should be carried out by services or actions.

Testing

- Have unit tests been written for the new / updated feature?
