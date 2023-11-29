# folder-compare


# Introduction
<h4>this package help to compare two directory and identify added, updated, and deleted file list </h4>
<p>return a array that contains file list of addedFileList, deletedFileList and updatedFileList</p>

# Usage
<p dir="auto">
  <code>npm i folder-compare</code>
</p>

<p>need to create tow folder name "start_file" and "update_file" at root directory</p>
<p>inside first folder put your old folder or file list</p>
<p>inside second folder put your updated folder or file list</p>

<div
  class="highlight highlight-source-js notranslate position-relative overflow-auto"
  dir="auto"
>
  <pre>
    
    const compare_folders_path = require("folder-compare");

    (async () => {
      let data = await compare_folders_path("start_file", "updated_file");
      console.log("data : ", data);
    })();
 
  </pre>
</div>

<p>compare_folders_path() function return arr that include [addedFileList, deletedFileList, diffInFileList]</p>
<p><b>addedFileList</b> : newly created file list</p>
<p><b>deletedFileList</b> : deleted file list</p>
<p><b>diffInFileList</b> : update file data list</p>



