# Sequelize seeders

To manage all data migrations you can use __seeders__. Seed files are some change in data that can be used to populate database table with sample data or test data.

Let's create a seed file which will add a demo user to our `Courses` table.
> `npx sequelize-cli seed:generate --name demo-course`

* This command will create a seed file in seeders folder.
* File name will look something like `XXXXXXXXXXXXXX-demo-course.js`.
* It follows the same `up` / `down` semantics as the migration files.

You have create a seed file. It's still not committed to database. To do that we need to run a simple command.
> `npx sequelize-cli db:seed:all`

This will execute that seed file and you will have a demo course inserted into `Courses` table.

More info in [Sequelize documentation](https://sequelize.org/master/manual/migrations.html#creating-the-first-seed).