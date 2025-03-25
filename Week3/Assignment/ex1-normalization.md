### 3.1. Exercise 1 : SQL Normalization

The manager of the dinner club would like to manage the information system that assists him to keep track of the dinners
had by members.
Because the manager is not an expert of Information Systems, (s)he uses the following table to store the information.
Please help the manger by using the knowledge of database normal forms.
Save all answers in a text file / MD file.

```
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
| member_id | member_name   | member_address | dinner_id | dinner_date | venue_code | venue_description | food_code | food_description |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
|         1 | Amit          | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C1, C2    | Curry, Cake      |
|         2 | Ben           | 24 Hudson lane | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         3 | Cristina      | 516 6th Ave    | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         4 | Dan           | 89 John St     | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         1 | Amit          | 325 Max park   | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         3 | Cristina      | 516 6th Ave    | D00001004 | Mar 25 '20  | B04        | Mama's Kitchen    | F1, M1    | Falafal, Mousse  |
|         5 | Gabor         | 54 Vivaldi St  | D00001005 | Mar 26 '20  | B05        | Hungry Hungary    | G1, P2    | Goulash, Pasca   |
|         6 | Hema          | 9 Peter St     | D00001003 | 01-04-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
```

1. What columns violate 1NF?
food_code and food_description columns violates 1NF because they store
multiple values. Also, dinner_date consist some wrong date formats which violates 1NF.

2. What entities do you recognize that could be extracted?
We can extract members (member_id, member_name and member_address), dinners (dinner_id, dinner_date), venues (venue_code, venue_description) and foods(food_code, food_description) entities from this table and create separate tables for each of these entities. We can also extract join tables which will be dinner_attendance (dinner and member relation) and dinner_food (dinner and food relation).

3. Name all the tables and columns that would make a 3NF compliant solution.
### Dinners
- `dinner_id` (VARCHAR(255), PK)
- `dinner_date` (DATE)
- `venue_code` (VARCHAR(255), FK)

### Members
- `member_id` (INT, PK)
- `member_name` (VARCHAR(255))
- `member_address` (VARCHAR(255))

### Venues
- `venue_code` (VARCHAR(255), PK)
- `venue_description` (VARCHAR(255))

### Foods
- `food_code` (VARCHAR(255), PK)
- `food_description` (VARCHAR(255))

### Dinner_Attendance
- `member_id` (INT, FK)
- `dinner_id` (VARCHAR(255), FK)

### Dinner_Food
- `dinner_id` (VARCHAR(255), FK)
- `food_code` (VARCHAR(255), FK)