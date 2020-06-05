import NamespaceModel from "minecraft-datapack-creator/models/namespace";

// TODO better type for feature
const pathFiller = (rootSchemaObject: FileDescriptor, path: string, feature?: { id?: string, name: string }) => {
  let pathSplit = path.split('/').slice(1);
  let currentSchemaObject = rootSchemaObject;
  pathSplit.forEach((split, i) => {
    let remadePath;
    if (!split.length) { // end file special case
      remadePath = path;
    }
    else {
      remadePath = `${rootSchemaObject.label}/`;
      for (let ii = 0; ii <= i; ii++) {
          remadePath = `${remadePath}${pathSplit[ii]}/`
      }
      let schemaObject = currentSchemaObject?.children?.findBy('path', remadePath);

      if (!schemaObject) {
          schemaObject = {
              label: split,
              type: 'folder',
              path: remadePath, // TODO likely needs to remove the last asdf/
              children: []
          };
          currentSchemaObject?.children?.push(schemaObject);
      }
      currentSchemaObject = schemaObject;
    }
  });
  if (feature) {
    let featureSchema: FileDescriptor = {
      id: feature.id,
      label: feature.name,
      type: 'file',
      path: path,
      extension: '.json' // functions should be .mcfunction :thinking:
    }

    currentSchemaObject?.children?.push(featureSchema);
  }
}

export default function folderDisplaySchemaGenerator(namespace: NamespaceModel, type: NamespaceFeature, filelessFolders?: string[]) {

  let schema: FileDescriptor[] = [
    {
      label: type, // todo might not scale
      type: 'folder',
      path: `${type}/`, // TODO also might not scale
      children: []
    }
  ];

  namespace[type].forEach((feature) => {
    pathFiller(schema[0], feature.path, feature);
  });

  filelessFolders?.forEach((path) => {
    pathFiller(schema[0], path);
  })

  return schema;
}
