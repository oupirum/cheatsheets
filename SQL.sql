
-- Naming rules:
	-- Can contain up to 64 chars.
	-- Can contain chars, numbers and "_" (underscore).
	-- Can begins from number, but can not contain only numbers.
	-- Names of tables and columns are case-sensitive.
	-- SQL requests are case-insensitive.


-- Comments:
	" -- "
	-- With spaces before and after. Part of SQL request after comment discarded.

-- Parentheses can be used to group operators in SQL request.
-- Multiple requests must be separated by ";" (semicolon).


----------------------------------------------------------
-- Data types

-- Integer:
INT		from -2 147 483 648 to 2 147 483 647
BIGINT	from -9 223 372 036 854 775 808 to 9 223 372 036 854 775 807

-- Fractional:
UNSIGNED
FLOAT
DOUBLE
REAL		synonym for DOUBLE
DECIMAL		fractional number stored as string
NUMERIC		synonym fro DECIMAL

-- Strings:
VARCHAR		up to 255 chars
TEXT		up to 65 535 chars
LONGTEXT	up to 4 294 967 295 chars

-- Binary:
BLOB		up to 65 535
LONGBLOB	up to 4 294 967 295

-- Date and time:
DATE		date in format YYYY-MM-DD
TIME		time in format HH:MM:SS
DATETIME	date and time in format YYYY-MM-DD HH:MM:SS
TIMESTAMP	date and time as timestamp. But when retrieved it represens as YYYYMMDDHHMMSS

----------------------------------------------------------
-- Conditional operatord
	-- used with WHERE

=	 -- WHERE id=3
<	 -- WHERE id<3
>	 -- WHERE id>3
<=	 -- WHERE id<=3
>=	 -- WHERE id>=3
!= or <>	 		-- WHERE id!=3
IS NOT NULL	 		-- WHERE id IS NOT NULL
IS NULL	 			-- WHERE mail IS NULL
BETWEEN m AND n	 			-- WHERE id BETWEEN 2 AND 4
NOT BETWEEN m AND n	 		-- WHERE id NOT BETWEEN 2 AND 4
IN(value1, value2, value3)	-- search in list of values (any) WHERE id IN(1, 3, 4)
OR	 	-- WHERE id>3 OR name='name'
AND		-- WHERE id>3 AND name='name'

-- Search:
LIKE, NOT LIKE
	%	-- any sequence
	_	-- any single char
	-- Ex:
		...WHERE field LIKE 'lo%' 	-- will find London, but not slow
		...WHERE field LIKE '_low'	-- will find slow, but not clown

-------------------------------------------------------
-- SQL queries

-- INSERT, UPDATE, DELETE, DROP returns true or false

-- Create table:
CREATE TABLE
	table (
		id INT NOT NULL AUTO_INCREMENT,
		PRIMARY KEY (id),
		field1 VARCHAR(30) DEFAULT 'default value',
		field2 TYPE PARAMS
	)
	DEFAULT CHARSET=utf8;


-- Insertion:
INSERT INTO
	table(
		field1,
		field2
		)
		VALUES(
			'value1',
			'value2'
		);


-- Selection:
SELECT
	field1, field2
	FROM table
	WHERE condition;

-- Aliases:
SELECT field AS alias_name ...

-- Select only differ strings:
SELECT DISTINCT ...

-- Conjunction queries to 2 tables:
SELECT
	table0.id, table1.id
	FROM table0, table1;

-- Conjunction via JOIN:
SELECT fields
	FROM table1
	JOIN_TYPE JOIN table2 ON condition
	-- where JOIN_TYPE:
		-- INNER		only where condition is right for both tables
		-- LEFT OUTER	all from first table + right condition from second
		-- RIGHT OUTER	right condition from first + all from second
	-- Ex:
		SELECT  table1.fld1, table2.fld2
			FROM table1
			LEFT OUTER JOIN table2 ON table1.id = table2.id
		-- returns all from table1 with assotiated values from table2 (NULL
		-- for non-existing values)

		SELECT  table1.fld1, table2.fld2
			FROM table1
			INNER JOIN table2 ON table1.id = table2.id
		-- all with appropriate id


-- Sorting results:
ORDER BY field0 ASC|DESC, field1 ASC|DESC
	-- where:
		-- ASC		ascending order (from low to high)
		-- DESC		descending order (from high to low)

-- Group by specific field:
GROUP BY field

-- Limit results:
LIMIT n
	-- Ex:
	... WHERE filed='value' LIMIT 3	-- always at end of query
	... LIMIT 10 OFFSET 5
		-- 10 rows from 5


-- Updating rows:
UPDATE table
	SET field1='value1', field2='value2'
	WHERE condition;


-- Removing rows:
DELETE FROM
	table
	WHERE condition;


-- Updating attributes:
ALTER TABLE
	table0
	CHANGE field_old field_new TEXT NULL DEFAULT NULL;

ALTER TABLE
	table0
	MODIFY COLUMN field datatype_new

ALTER TABLE
	table0
	ADD field_new datatype


-- Removing table:
DROP TABLE table
-- Database:
DROP DATABASE dbname


-- Setup charset for database:
ALTER DATABASE dbname CHARACTER SET utf8;


---------------------------------
-- Conjunction queries:

-- Join results of two queries:
	SELECT
		field
		FROM table0
		WHERE (table0.id=?)
	UNION
	SELECT
		field
		FROM table1
		WHERE (table1.id=?);

-- to perform several queries they can be separated by ";", if driver suports it:
	DELETE
		FROM follower
		WHERE (time<'time');
	UPDATE
		item
		SET complete=false
		WHERE ((SELECT COUNT(id) FROM follower WHERE item_id=item.id)=0);

-- Query can contain subqueries:
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

	-- Important that WHERE condition will be processed before other parts,
	-- so AS-definitions are not accessible in WHERE condition.
