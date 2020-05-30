import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import DatapackModel from 'minecraft-datapack-creator/models/datapack';
import NamespaceModel from 'minecraft-datapack-creator/models/namespace';

export async function zip(datapack: DatapackModel) {
  var zip = new JSZip();
  zip.file('pack.mcmeta', JSON.stringify({
    pack: {
      pack_format: 5,
      description: datapack.description ?? ''
    }
  }));
  let data = zip.folder('data');

  let namespaces = await datapack.namespaces;

  for (let nsIndex = 0; nsIndex < namespaces.length; nsIndex++) {
    const ns = namespaces.objectAt(nsIndex) as NamespaceModel;
    let namespace = data.folder(ns.name);
    let functions = namespace.folder('functions');
    let functionModels = await ns.functions;
    for (const f of functionModels.toArray()) {
      functions.file(`${f.name}.mcfunction`, f.value);
    }
  }

  let zipBlob = await zip.generateAsync({ type: 'blob' });
  await saveAs(zipBlob, `${datapack.name}.zip`);
}

export async function loadZip(e: { target: { files: any[] } }) {
  console.log('testOpenZip', e.target.files);
  let zip = await JSZip.loadAsync(e.target.files[0]);
  console.log('eh zip', zip);
  let files: any[] = [];
  zip.forEach(async (relativePath: string, file: JSZip.JSZipObject) => {
    let text = await file.async('text')
    files.push({ relativePath, file, text });
  });
  return files;
}
