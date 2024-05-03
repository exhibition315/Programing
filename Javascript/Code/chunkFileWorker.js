function createChunk(file, index, chunkSize, spark) {
  return new Promise((resolve) => {
    const start = index * chunkSize;
    const end = start + chunkSize;
    const fileReader = new FileReader();
    const blob = file.slice(start, end);
    fileReader.onload = (e) => {
      spark.append(e.target.result);
      resolve({
        start,
        end,
        index,
        hash: spark.end(),
        blob,
      });
    };
    fileReader.readAsArrayBuffer(blob);
  });
}

onmessage = async (e) => {
  const {
    file,
    CHUNK_SIZE,
    startChunkIndex: start,
    endChunkIndex: end,
    spark,
  } = e.data;
  console.log(file, CHUNK_SIZE, start, end);
  const proms = [];
  for (let i = start; i < end; i++) {
    proms.push(createChunk(file, i, CHUNK_SIZE, spark));
  }
  const chunks = await Promise.all(proms);
  postMessage(chunks);
};
