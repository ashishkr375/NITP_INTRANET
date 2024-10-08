"use client";

import React from 'react';

const content = [
 
  {
    "Downloads": "Medical Claim Form",
    "DLink": "https://drive.google.com/file/d/1Rx2FxIqoWBsxqFbmBTvWCl52ZLN_DfMy/view?usp=drivesdk",
    "Office order": "List of Hospitals",
    "OLink": "https://drive.google.com/file/d/1YC839XCnkbgAfpW9pFLqko6t135i1kD1/view?usp=drivesdk"
  },
  {
    "Downloads": "Medical Certificate (A)",
    "DLink": "https://drive.google.com/file/d/1pHaYlHR2PJW29pUAfaLTJ_fnoEOuu4Iv/view?usp=drivesdk",
    "Office order": ""
  },
  {
    "Downloads": "Medical Certificate (B)",
    "DLink": "https://drive.google.com/file/d/1hXLAzspVCDdoQt9pKQ9WuTCpOOQZPZTu/view?usp=drivesdk",
    "Office order": ""
  },
  {
    "Downloads": "Medical Emergency Certificate",
    "DLink": "https://drive.google.com/file/d/1K2Cjbiuhl9_X-vyvWwxqA324ry5ViiGX/view?usp=drivesdk",
    "Office order": ""
  },
  {
    "Downloads": "Medical Nursing Certificate",
    "DLink": "https://drive.google.com/file/d/1MUC3NgNuUT8ebaGbIx1qTRsJvMfp-KPG/view?usp=drivesdk",
    "Office order": ""
  },
  
];

const DownloadsPage = () => {
  return (
    <div className="mx-auto p-4 text-neutral-600 bg-white/70">
      <h1 className="text-3xl font-bold mb-6 text-red-900 text-center">Medical Forms</h1>
      <table className="table-auto border-collapse border border-gray-300 mx-0 md:mx-80">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 w-1/6">Name</th>
            <th className="border border-gray-300 px-4 py-2 w-1/12">Download Form</th>
            <th className="border border-gray-300 px-4 py-2 w-1/6">Name</th>
            <th className="border border-gray-300 px-4 py-2 w-1/12">Download Form</th>
          </tr>
        </thead>
        <tbody>
          {content.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2 w-1/6">{item.Downloads}</td>
              <td className="border border-gray-300 px-4 py-2 w-1/12 text-center">
                {item.DLink ? (
                  <a href={item.DLink} target="_blank" rel="noopener noreferrer" className="bg-blue-400 text-white font-bold px-4 py-2 rounded-md hover:bg-gradient-to-r from-cyan-500 to-blue-500 md:text-xs text-xs">
                    Download
                  </a>
                ) : (
                 
                    <span></span>
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2 w-1/6">{item["Office order"]}</td>
              <td className="border border-gray-300 px-4 py-2 w-1/12 text-center">
                {item.OLink ? (
                  <a href={item.OLink} target="_blank" rel="noopener noreferrer" className="bg-blue-400 text-white font-bold px-4 py-2 rounded-md hover:bg-gradient-to-r from-cyan-500 to-blue-500 md:text-xs text-xs">
                    Download
                  </a>
                ) : (
                  <span></span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DownloadsPage;
