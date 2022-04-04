import {
  // cityData,
  provinceData,
} from "@heerey525/china-division-data";

export function useCityData(cityData: any) {
  let treeData = [];
  let key: string, data: any;
  for ([key, data] of Object.entries(cityData)) {
    let lastPid = -1; // 上一次循环的pid值
    let obj: any = {};
    // console.log(value)
    for (let i = 0; i < data.length; i++) {
      let province = data[i].province;
      // 若本次循环的pid与上次pid不同，新建province对象
      if (province !== lastPid) {
        // 若上次pid不为-1，代表已进行过循环，把旧province放入结果数据，并新建province
        if (lastPid !== -1) {
          treeData.push(obj);
        }
        obj = {
          value: data[i].province,
          label: data[i].province,
          children: [{ value: data[i].name, label: data[i].name }],
        };
        // 若本次循环pid===上次pid，代表为同一省份，把city放入provicne中
      } else {
        obj.children.push({ value: data[i].name, label: data[i].name });
      }

      // 因最后一次循环后没有下次循环，把province结果中
      // last time
      if (i === data.length - 1) {
        treeData.push(obj);
      }
      // 循环后，本次pid变为上次pid
      lastPid = province;
    }
  }
  return [treeData];
}

export function useProvinceData(provinceData: any) {
  let province: any = []
  return [province];
}