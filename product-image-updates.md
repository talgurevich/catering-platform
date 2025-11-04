# Product Image Updates

## Database Update Instructions

Update the following products in Prisma Studio (http://localhost:5556):

### כריכונים (Sandwiches)
1. **מיני קרואסנדוויץ׳**
   - Image URL: `/images/croissant-sandwiches.jpg`

2. **כריכונים בלחם כוסמין פרוס**
   - Image URL: `/images/sliced-bread-sandwiches.jpg`

3. **כריכונים במיני בריוש**
   - Image URL: `/images/mini-brioche-burgers.jpg`

4. **כריכונים בפרעצל**
   - Image URL: `/images/mini-burgers-vegetables.jpg`

### כריכונים - פרימיום (Premium Sandwiches)
5. **כריכונים פרימיום בפרעצל**
   - Image URL: `/images/premium-burgers-display.jpg`

6. **כריכונים במיני פרעצל פרימיום**
   - Image URL: `/images/premium-mini-burgers.jpg`

7. **כריכונים בייגל אמריקאי חצוי פרימיום**
   - Image URL: `/images/bagel-premium-box.jpg`

8. **כריכונים בייגל אמריקאי חצוי**
   - Image URL: `/images/bagel-sandwiches.jpg`

### מאפים מלוחים (Savory Pastries)
9. **ירקות אנטיפסטי**
   - Image URL: `/images/roasted-vegetables.jpg`

10. **ירקות טריים**
    - Image URL: `/images/fresh-vegetables.jpg`

### מאפים מתוקים (Sweet Pastries)
11. **רוגלך (32-34 יח׳)**
    - Image URL: `/images/rugelach-display.jpg`

12. **עוגות שמרים**
    - Image URL: `/images/sweet-brioche-pastries.jpg`

13. **רולדות פרסבורגר**
    - Image URL: `/images/filled-pastries.jpg`

---

## Alternative: SQL Update Script

If you prefer to run SQL directly:

```sql
UPDATE "Product" SET image_url = '/images/croissant-sandwiches.jpg' WHERE name_he = 'מיני קרואסנדוויץ׳';
UPDATE "Product" SET image_url = '/images/sliced-bread-sandwiches.jpg' WHERE name_he = 'כריכונים בלחם כוסמין פרוס';
UPDATE "Product" SET image_url = '/images/mini-brioche-burgers.jpg' WHERE name_he = 'כריכונים במיני בריוש';
UPDATE "Product" SET image_url = '/images/mini-burgers-vegetables.jpg' WHERE name_he = 'כריכונים בפרעצל';
UPDATE "Product" SET image_url = '/images/premium-burgers-display.jpg' WHERE name_he = 'כריכונים פרימיום בפרעצל';
UPDATE "Product" SET image_url = '/images/premium-mini-burgers.jpg' WHERE name_he = 'כריכונים במיני פרעצל פרימיום';
UPDATE "Product" SET image_url = '/images/bagel-premium-box.jpg' WHERE name_he = 'כריכונים בייגל אמריקאי חצוי פרימיום';
UPDATE "Product" SET image_url = '/images/bagel-sandwiches.jpg' WHERE name_he = 'כריכונים בייגל אמריקאי חצוי';
UPDATE "Product" SET image_url = '/images/roasted-vegetables.jpg' WHERE name_he = 'ירקות אנטיפסטי';
UPDATE "Product" SET image_url = '/images/fresh-vegetables.jpg' WHERE name_he = 'ירקות טריים';
UPDATE "Product" SET image_url = '/images/rugelach-display.jpg' WHERE name_he = 'רוגלך (32-34 יח׳)';
UPDATE "Product" SET image_url = '/images/sweet-brioche-pastries.jpg' WHERE name_he = 'עוגות שמרים';
UPDATE "Product" SET image_url = '/images/filled-pastries.jpg' WHERE name_he = 'רולדות פרסבורגר';
```
