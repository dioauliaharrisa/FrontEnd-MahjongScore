import React from "react";

export default function TableView() {
  return (
    // <div className="h-screen bg-[#3d476a] ">
    //   <div class="table w-full">
    //     <div class="table-header-group border-b-2">
    //       <div class="table-row uppercase ">
    //         <div class="table-cell text-left text-xs">Date</div>
    //         <div class="table-cell text-left text-xs">Province/Club</div>
    //         <div class="table-cell text-left text-xs">East</div>
    //         <div class="table-cell text-left text-xs">South</div>
    //         <div class="table-cell text-left text-xs">West</div>
    //         <div class="table-cell text-left text-xs">North</div>
    //       </div>
    //     </div>
    //     <div class="table-row-group">
    //       <div class="table-row">
    //         <div class="table-cell">121212</div>
    //         <div class="table-cell">232323</div>
    //         <div class="table-cell">343434</div>
    //       </div>
    //       <div class="table-row">
    //         <div class="table-cell">Witchy Woman</div>
    //         <div class="table-cell">The Eagles</div>
    //         <div class="table-cell">1972</div>
    //       </div>
    //       <div class="table-row">
    //         <div class="table-cell">Shining Star</div>
    //         <div class="table-cell">Earth, Wind, and Fire</div>
    //         <div class="table-cell">1975</div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div class="overflow-x-auto relative ">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-200 uppercase bg-[#3d476a]">
          <tr>
            <th scope="col" class="py-3 px-6 text-xs">
              Date
            </th>
            <th scope="col" class="py-3 px-6 text-xs">
              Province/Club
            </th>
            <th scope="col" class="py-3 px-6 text-xs">
              East
            </th>
            <th scope="col" class="py-3 px-6 text-xs">
              South
            </th>
            <th scope="col" class="py-3 px-6 text-xs">
              West
            </th>
            <th scope="col" class="py-3 px-6 text-xs">
              North
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              2022/13/12
            </th>
            <td class="py-4 px-6">DKI Jakarta/[fill in here]</td>
            <td class="py-4 px-6">FUJISAKI, Satoshi/30000</td>
            <td class="py-4 px-6">NARA, Keijun/30000</td>
            <td class="py-4 px-6">ZUBENKO, Anna/30000</td>
            <td class="py-4 px-6">COURTOIS, Valentin/30000</td>{" "}
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              2022/13/12
            </th>
            <td class="py-4 px-6">DKI Jakarta/[fill in here]</td>
            <td class="py-4 px-6">FUJISAKI, Satoshi/30000</td>
            <td class="py-4 px-6">NARA, Keijun/30000</td>
            <td class="py-4 px-6">ZUBENKO, Anna/30000</td>
            <td class="py-4 px-6">COURTOIS, Valentin/30000</td>{" "}
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              2022/13/12
            </th>
            <td class="py-4 px-6">DKI Jakarta/[fill in here]</td>
            <td class="py-4 px-6">FUJISAKI, Satoshi/30000</td>
            <td class="py-4 px-6">NARA, Keijun/30000</td>
            <td class="py-4 px-6">ZUBENKO, Anna/30000</td>
            <td class="py-4 px-6">COURTOIS, Valentin/30000</td>{" "}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
