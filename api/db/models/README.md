# Sequelize models

To create a model:
* Run `npx sequelize model:create --name Course --attributes id:number name:string`

This will:
* Create a model file `course` in `models` folder
* Create a migration file with name like `XXXXXXXXXXXXXX-create-course.js` in `migrations` folder.

More info in [Sequelize documentation](https://sequelize.org/master/manual/migrations.html#creating-the-first-model--and-migration-).