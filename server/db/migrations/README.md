# Sequelize migrations

Just like you use version control systems such as Git to manage changes in your source code, you can use **migrations** to keep track of changes to the database. With migrations you can transfer your existing database into another state and vice versa: Those state transitions are saved in migration files, which describe how to get to the new state and how to revert the changes in order to get back to the old state.

You will need the Sequelize Command-Line Interface (CLI). The CLI ships support for migrations and project bootstrapping.

A Migration in Sequelize is javascript file which exports two functions, up and down, that dictate how to perform the migration and undo it. You define those functions manually, but you don't call them manually; they will be called automatically by the CLI. In these functions, you should simply perform whatever queries you need, with the help of sequelize.query and whichever other methods Sequelize provides to you. There is no extra magic beyond that.

To create a model:

- Run `npx sequelize model:create --name Course --attributes id:number name:string`

This will:

- Create a model file `course` in `models` folder;
- Create a migration file with name like `XXXXXXXXXXXXXX-create-course.js` in `migrations` folder.

More info about Sequelize migrations:

- [Sequelize documentation](https://sequelize.org/master/manual/migrations.html)
