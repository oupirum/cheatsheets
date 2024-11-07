# SQL cheatsheet

* [Data types](#data-types)
* [Conditional operators](#conditional-operators)
* [Constraints](#constraints)
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

### Compare
`=`	-- e.g., *WHERE id=3*<br/>
`<`	<br/>
`>`	<br/>
`<=`	<br/>
`>=`	<br/>
`!=` or `<>`	<br/>

### Nullity
`IS NOT NULL`	-- e.g., *WHERE id IS NOT NULL*<br/>
`IS NULL`	<br/>

### Range
`BETWEEN m AND n`	-- in range [m, n]<br/>
`NOT BETWEEN m AND n`	-- e.g., *WHERE id NOT BETWEEN 2 AND 4*<br/>

### Logical
`OR`	-- e.g., *WHERE id>3 OR name='name'*<br/>
`AND`	<br/>
`IN(values...)`	-- equal to any of provided values, e.g., *WHERE catid IN(1, 3, 4)*<br/>

=========================================================================
# Constraints <a id="constraints"></a>

`CHECK (condition)`	-- control the column value, e.g., *CHECK(discount < 50)*, *CHECK(catid BETWEEN 1 AND 10)*<br/>
`NOT NULL` <br/>
`UNIQUE (colname, ...)` <br/>

`PRIMARY KEY (colname, ...)`	-- column (or group of columns) contains unique identifier of the row <br/>
`FOREIGN KEY (colname, ...)`	-- values corresponds to a value from another table<br/>

=========================================================================
# Search <a id="search"></a>

`LIKE someval`	<br/>
`NOT LIKE someval`	<br/>

Wildcards:<br/>
`%`	-- any sequence<br/>
`_`	-- any single char<br/>

E.g.:
```sql
	... WHERE col LIKE 'lo%'	-- will find "London", but not "slow"
	... WHERE col LIKE '_low'	-- will find "slow", but not "clown"
```

=========================================================================
# Select <a id="select"></a>

```sql
SELECT
	col1, ...
	FROM table
	WHERE condition;
```

### Select from multiple tables

```sql
SELECT
	table1.id, ...,
	FROM table1, ...;
```

---
### Join <a id="join"></a>

To combine rows from multiple tables based on a related column between them. Retrieving related data in a single query.

```sql
SELECT
	col, ...
	FROM table1
	JOIN_TYPE JOIN table2 ON condition
```
where *JOIN_TYPE* is:<br/>
`INNER`			rows that have matching values in both tables.<br/>
`LEFT`			all from first table + matching from second table.<br/>
`RIGHT`			matching from first + all from second.<br/>

E.g.:
```sql
SELECT
	table1.fld1, table2.fld2
	FROM table1
	LEFT JOIN table2 ON table1.id = table2.id
-- Returns all rows from table1 with associated values from table2 (NULL for non-existing values).
```

```sql
SELECT
	table1.fld1, table2.fld2
	FROM table1
	INNER JOIN table2 ON table1.id = table2.id
-- Rows with appropriate id.
```

---
### Union <a id="union"></a>

To combine the result set of multiple SELECT statements into single result set.

```sql
SELECT
	colname, ...
	FROM table1
UNION
SELECT
	colname, ...
	FROM table1
```
Selects only distinct values by default. `UNION ALL` allows duplications.

---
### Sort results <a id="sort"></a>

```sql
ORDER BY colname ASC|DESC, ...
```
where:<br/>
`ASC`		-- ascending order (from low to high)<br/>
`DESC`	-- descending order (from high to low)<br/>

---
### Group by specific column <a id="group"></a>

```sql
GROUP BY colname
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
... WHERE filed='value' LIMIT 3	-- first 3 rows
... LIMIT 10 OFFSET 5
	-- 10 rows from 5
```

=========================================================================
# Insert row <a id="insert"></a>

```sql
INSERT INTO
	tablename
	(
		col1,
		...
	)
	VALUES(
		value1,
		...
	);
```

=========================================================================
# Update rows <a id="update"></a>

```sql
UPDATE
	tablename
	SET col1=value1, ...
	WHERE condition;
```

=========================================================================
# Delete rows <a id="delete"></a>

```sql
DELETE FROM
	tablename
	WHERE condition;
```

=========================================================================
# Alter table <a id="alter-table"></a>

Rename column:
```sql
ALTER TABLE
	tablename
	CHANGE col_old col_new TEXT NULL DEFAULT NULL;
```

Change column type:
```sql
ALTER TABLE
	tablename
	MODIFY COLUMN colname datatype_new
```

Add column:
```sql
ALTER TABLE
	tablename
	ADD col_new datatype
```

Set charset for database:
```sql
ALTER DATABASE dbname CHARACTER SET utf8;
```

=========================================================================
# Create table <a id="create-table"></a>

```sql
CREATE TABLE
	tablename (
		columnname type constraints,
		...
	)
	attributes
```

E.g.:
```sql
CREATE TABLE
	products (
		id INT NOT NULL AUTO_INCREMENT,
		PRIMARY KEY (id),
		category_id INT NOT NULL,
		FOREIGN KEY (category_id) REFERENCES product_category(id),
		seller VARCHAR(30) DEFAULT 'no seller',
		price INT NOT NULL,
		CHECK(price BETWEEN 1, 100000)
	)
	DEFAULT CHARSET=utf8;
```

=========================================================================
# Drop table <a id="drop-table"></a>

```sql
DROP TABLE tablename
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
