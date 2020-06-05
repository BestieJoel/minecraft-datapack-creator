namespace = {
  functions: [
      {
        name: 'setup',
        path: 'functions/'
      },
      {
        name: 'uninstall',
        path: 'functions/'
      },
      {
        name: 'test 1',
        path: 'functions/one/'
      },
      {
        name: 'test 2',
        path: 'functions/one/two/'
      },
      {
        name: 'test 3',
        path: 'functions/pizza/'
      }
  ]
}

function SchemaGenerator(namespace, type, filelessFolders) {

    let schema = [
        {
            label: type, // todo might not scale
            type: 'folder',
            children: []
        }
    ];

    let pathFiller = (rootSchemaObject, path, feature) => {
      let pathSplit = path.split('/').slice(1);
      let currentSchemaObject = rootSchemaObject;
      pathSplit.forEach((split, i) => {
        let remadePath;
        if (!split.length) {
          // end file special case
          remadePath = path;
        }
        else {
          remadePath = `${schema[0].label}/`;
          for (let ii = 0; ii <= i; ii++) {
              remadePath = `${remadePath}${pathSplit[ii]}/`
          }
          let schemaObject = currentSchemaObject.children.findBy('path', remadePath);

          if (!schemaObject) {
              schemaObject = {
                  label: split,
                  type: 'folder',
                  path: remadePath, // TODO likely needs to remove the last asdf/
                  children: []
              };
              currentSchemaObject.children.push(schemaObject);
          }

          currentSchemaObject = schemaObject;
        }
      });
      if (feature) {
        let featureSchema = {
          label: feature.name,
          type: 'file',
          path: path,
          extension: '.json' // functions should be .mcfunction :thinking:
        }

        currentSchemaObject.children.push(featureSchema);
      }
    }

    namespace[type].forEach((feature) => {
      pathFiller(schema[0], feature.path, feature);
    });

    filelessFolders.forEach((path) => {
      pathFiller(schema[0], path);
    })

    return schema;
}

SchemaGenerator(namespace, 'functions', ['functions/one/two/three', 'functions/pizza/pepperoni', 'functions/chat/is/great'])
