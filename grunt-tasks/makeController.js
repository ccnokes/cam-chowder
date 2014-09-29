module.exports = function(grunt) {

  // sample usage: grunt makeController --name=blog
  grunt.registerTask('makeController', '', function() {
    
    var name = grunt.option('name');

    var cFilepath = "app/controllers/" + name + ".js";
    var isExistent = grunt.file.exists(cFilepath);

    //make sure its a valid name
    if(!name || typeof name !== 'string' || isExistent) {
      console.log("invalid controller name or a controller with that name already exists");
      return false;
    }    
    
    //create some default contents
    var contents = "//" + name + " controller \n";
        contents += "exports.index = function(req, res) {\n\n};";
    
    //write file
    grunt.file.write(cFilepath, contents);

    //create view file
    var vFilepath = "app/views/" + name + "/" + name + ".jade";
    var viewContents = "extends ../layout";
    
    if(!grunt.file.exists(vFilepath)) {
      grunt.file.write(vFilepath, viewContents);
    } 
    else {
      console.log(vFilepath + ' view already exists, skipping');
    }

  });

};