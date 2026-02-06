**Setup Instructions**
1. Clone the repository
- git clone <your-repo-url>
- cd expense-splitter

2. Install dependencies

- Using npm:

 npm install


- Or yarn:

 yarn

3. Start development server
- npm run dev


or

yarn dev

4. Open in browser

After starting, Vite will show something like:

http://localhost:5173


Open this link in your browser.
   ```
**1. Approach and Design**
State Management

- This project uses React’s useState hook to manage important data such as people and expenses.
- All main state is stored in the App component and shared with other components using props.

I chose this approach because the application is small and does not require advanced state management tools. It keeps the code simple and easy to understand.

**Component Structure**

The application is divided into different components, where each one handles a specific task:

**App** – Manages the main state

**PeopleManager** – Adds and removes people

**ExpenseForm** – Adds new expenses

**BalanceView** – Displays balances and settlements

**ExpenseList** – Shows expense history

This separation makes the project easier to manage and modify.

**Data Flow**

- All main data is stored in the App component.
- Child components receive this data through props and send updates back using callback functions.

- This creates a clear one-way flow of data, which helps avoid confusion and makes debugging easier.

**Styling and Responsiveness**

- Tailwind CSS is used for styling.
- Responsive design is implemented using Tailwind breakpoints so the layout adjusts automatically for different screen sizes.

- On mobile devices, components are displayed in a single column

- On larger screens, a two-column layout is used

- This makes the application usable on both phones and computers.

**Expense Splitting Logic**

The application supports two types of expense splitting:

**Equal Split**
The total amount is divided equally among selected members.

**Custom Split**
Users can manually enter how much each person should pay. The app checks that the total matches the expense amount.

**Balance and Settlement Logic**

- Each person has a balance that updates after every expense.

- A positive balance means the person should receive money

- A negative balance means the person needs to pay money

- The system matches people who owe money with those who should receive money to reduce the number of required transactions.


**2. Assumptions**

- While developing this project, the following assumptions were made:

- All users use the same currency

- Each person has a unique name

- Every expense has only one payer

- Users manually select participants for each expense

- Most entered values are valid

- Data is stored only in memory

- No login system is required

- Expenses are entered honestly

- The app works after loading without internet

**3. Incomplete Features / Issues**

- At the moment, the application has a few limitations that could be improved in the future.

- All data is stored only in memory, so refreshing the page clears all saved people and expenses. 

- User authentication and profile management are not implemented. The application is designed for general use without individual accounts.

- Only one group can be managed at a time. Support for multiple groups has not been added yet.

- There is currently no option to export, download, or share expense data.

- The application uses a single default currency and does not support currency selection or localization.

- People are identified only by their names, so users with the same name cannot be distinguished.

- Input validation is basic and does not handle all possible invalid or extreme values.

- Small rounding differences may appear in balance calculations due to the use of decimal numbers.

- If a very large number of expenses are added, performance may become slower.

- Accessibility support, such as screen reader compatibility and full keyboard navigation, is limited.

- Although the layout is responsive, the mobile version does not include advanced features like bottom navigation or gesture support
