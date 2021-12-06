const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const getJSONdata = async function (url) {
  try {
    const res = await Promise.race([fetch(`${url}`), timeout(5)]);
    const data = await res.json();
    if (!res.ok) throw new Error(` ${res.status} ${data.error.message}`);
    return data;
  } catch (err) {
    throw err;
  }
};
