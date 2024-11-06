# SQL cheatsheet

* [Data types](#data-types)
* [Conditional operators](#conditional-operators)
* [Search](#search)
* [Select](#select)
	* [Join](#join)
	* [Union](#union)
	* [Sort](#sort)
	* [Group](#group)
	* [Limit](#limit)
* [Insert row](#insert)
* [Update rows](#update)
* [Delete rows](#delete)
* [Alter table](#alter-table)
* [Create table](#create-table)
* [Drop table](#drop-table)
* [Drop database](#drop-db)
* [Subquery](#subquery)


----------------------------------------
Naming rules:<br/>
* Can contain up to 64 chars.
* Can contain chars, numbers and underscore.
* Can begins from number, but can not contain only numbers.
* Names of tables and columns are case-sensitive.
* SQL operators and statements are case-insensitive.

---
` -- ` can be used to define a comment.<br/>
With whitespaces before and after.<br/>
Any text between ` -- ` and the end of the line will not be executed.<br/>

---
Parentheses can be used to group operators.<br/>

---
Multiple queries must be separated by `;`.<br/>


=========================================================================
# Data types <a id="data-types"></a>

### Integer
`INT`		from *-2 147 483 648* to *2 147 483 647*<br/>
`BIGINT`	from *-9 223 372 036 854 775 808* to *9 223 372 036 854 775 807*<br/>

---
### Fractional
`UNSIGNED`<br/>
`FLOAT`<br/>
`DOUBLE`<br/>
`REAL`		synonym for DOUBLE<br/>
`DECIMAL`		fractional number stored as string<br/>
`NUMERIC`		synonym fro DECIMAL<br/>

### Strings
`VARCHAR`		up to *255* chars<br/>
`TEXT`		up to *65 535* chars<br/>
`LONGTEXT`	up to *4 294 967 295* chars<br/>

### Binary
`BLOB`		up to *65 535*<br/>
`LONGBLOB`	up to *4 294 967 295*<br/>

### Date and time
`DATE`		date in format *YYYY-MM-DD*<br/>
`TIME`		time in format *HH:MM:SS*<br/>
`DATETIME`	date and time in format *YYYY-MM-DD HH:MM:SS*<br/>
`TIMESTAMP`	date and time as timestamp. But when retrieved it represents as *YYYYMMDDHHMMSS*<br/>


=========================================================================
# Conditional operators <a id="conditional-operators"></a>

Are using with `WHERE`

`=`	-- e.g., *WHERE id=3*<br/>
`<`	<br/>
`>`	<br/>
`<=`	<br/>
`>=`	<br/>
`!=` or `<>`	<br/>
`IS NOT NULL`	-- e.g., *WHERE id IS NOT NULL*<br/>
`IS NULL`	<br/>
`BETWEEN m AND n`	<br/>
`NOT BETWEEN m AND n`	-- e.g., *WHERE id NOT BETWEEN 2 AND 4*<br/>
`IN(value1, value2, ...)`	-- equal to any of provided values, e.g., *WHERE id IN(1, 3, 4)*<br/>
`OR`	-- e.g., *WHERE id>3 OR name='name'*<br/>
`AND`	<br/>

=========================================================================
# Search <a id="search"></a>

`LIKE`, `NOT LIKE`<br/>

Wildcards:<br/>
`%`	-- any sequence<br/>
`_`	-- any single char<br/>

E.g.:
```sql
	... WHERE field LIKE 'lo%' 	-- will find "London", but not "slow"
	... WHERE field LIKE '_low'	-- will find "slow", but not "clown"
```

=========================================================================
# Select <a id="select"></a>

```sql
SELECT
	field1, field2
	FROM table
	WHERE condition;
```

### Select from multiple tables

```sql
SELECT
	table0.id, table1.id
	FROM table0, table1;
```

---
### Join <a id="join"></a>

To combine rows from multiple tables based on a related column between them. Retrieving related data in a single query.

```sql
SELECT fields
	FROM table1
	JOIN_TYPE JOIN table2 ON condition
```
where *JOIN_TYPE* is:<br/>
`INNER`			rows that have matching values in both tables.<br/>
`LEFT`			all from first table + matching from second table.<br/>
`RIGHT`			matching from first + all from second.<br/>

E.g.:
```sql
SELECT table1.fld1, table2.fld2
	FROM table1
	LEFT JOIN table2 ON table1.id = table2.id
-- Returns all rows from table1 with associated values from table2 (NULL for non-existing values).
```

```sql
SELECT table1.fld1, table2.fld2
	FROM table1
	INNER JOIN table2 ON table1.id = table2.id
-- Rows with appropriate id.
```

---
### Union <a id="union"></a>

To combine the result set of multiple SELECT statements into single result set.

```sql
SELECT
	field
	FROM table0
	WHERE (table0.id=?)
UNION
SELECT
	field
	FROM table1
	WHERE (table1.id=?);
```

---
### Sort results <a id="sort"></a>

```sql
ORDER BY field0 ASC|DESC, field1 ASC|DESC
```
where:<br/>
`ASC`		ascending order (from low to high).<br/>
`DESC`	descending order (from high to low).<br/>

---
### Group by specific field <a id="group"></a>

```sql
GROUP BY field
```

---
### Limit results <a id="limit"></a>

```sql
LIMIT n
```

### Offset
```sql
OFFSET n
```

E.g.:
```sql
... WHERE filed='value' LIMIT 3	-- always at end of query
... LIMIT 10 OFFSET 5
	-- 10 rows from 5
```

=========================================================================
# Insert row <a id="insert"></a>

```sql
INSERT INTO
	table(
		field1,
		field2
		)
		VALUES(
			'value1',
			'value2'
		);
```

=========================================================================
# Update rows <a id="update"></a>

```sql
UPDATE table
	SET field1='value1', field2='value2'
	WHERE condition;
```

=========================================================================
# Delete rows <a id="delete"></a>

```sql
DELETE FROM
	table
	WHERE condition;
```

=========================================================================
# Alter table <a id="alter-table"></a>

Rename column:
```sql
ALTER TABLE
	table0
	CHANGE field_old field_new TEXT NULL DEFAULT NULL;
```

Change column type:
```sql
ALTER TABLE
	table0
	MODIFY COLUMN field datatype_new
```

Add column:
```sql
ALTER TABLE
	table0
	ADD field_new datatype
```

Set charset for database:
```sql
ALTER DATABASE dbname CHARACTER SET utf8;
```

=========================================================================
# Create table <a id="create-table"></a>

```sql
CREATE TABLE
	table (
		id INT NOT NULL AUTO_INCREMENT,
		PRIMARY KEY (id),
		field1 VARCHAR(30) DEFAULT 'default value',
		field2 TYPE PARAMS
	)
	DEFAULT CHARSET=utf8;
```

=========================================================================
# Drop table <a id="drop-table"></a>

```sql
DROP TABLE table
```

=========================================================================
# Drop database <a id="drop-db"></a>

```sql
DROP DATABASE dbname
```


=========================================================================
# Subquery <a id="subquery"></a>

Query can contain subqueries:
```sql
SELECT
	item_id,
	(SELECT price from item where id=follower.item_id) AS price,
	(SUM(paid) * 100 / (SELECT price from item where id=follower.item_id)) AS percents
	FROM follower
	WHERE (
		(SELECT complete
			FROM item
			WHERE id=follower.item_id)=false
	)
	GROUP BY item_id
	ORDER BY percents DESC;
```

*WHERE* condition will be processed before other parts,<br/>
so the *AS*-definitions are not accessible in *WHERE* condition.

---
`INSERT`, `UPDATE`, `DELETE`, `DROP` returns true or false.
