

var a = {
	currentPage: 1,
	pageSize: 40,
	queryList: [
		[
       商品属性
			{ 
				ids: [ "ff80808165391621016541b64386037b", "ff80808165391621016541b64386037e"],
				operate: "intersect",
				type: "brand"
      },
       品类
			{
				ids: ["ff8080816687cf1501668cb7d991075d", "ff808081667857c60166864de73f073a"],
				operate: "intersect",
				type: "category"
      },
       规格
			{
				ids: ["ff80808165a604420165e2001af046f9", "ff80808165a6043f0165e216150546f1"],
				operate: "union",
				type: "standard"
      },
       属性
			{
				ids: ["ff80808165a604400165e2136dbd50a3", "ff80808165a6043f0165e210a92346e2"],
				operate: "diff",
				type: "property"
      },
       部分商品
			{
				ids: ["ff80808166a414ea0166a42c59062213", "ff80808166a414ea0166a42c05c42185"],
				operate: "union",
				type: "goods"
      },
       部分商品sku
			{
				ids: ["0713eb81815f467dabf97c109e823252","87c37c34e2ff4f7092ea8ea014b625e0"],
				operate: "diff",
				type: "sku"
			}
		],
		[
			{
				ids: ["ff80808165391621016541b64386037b","ff80808165391621016541b64386037e"],
				operate: "intersect",
				type: "brand"
			},
			{
				ids: ["ff8080816687cf1501668cb7d991075d", "ff808081667857c60166864de73f073a"],
				operate: "intersect",
				type: "category"
			},
			{
				ids: ["ff80808165a604400165e2136dbd50a3","ff80808165a6043f0165e210a92346e2"],
				operate: "diff",
				type: "property"
			},
			{
				ids: ["ff80808166a414ea0166a42c59062213", "ff80808166a414ea0166a42c05c42185"],
				operate: "union",
				type: "goods"
			},
			{
				ids: ["172e6a9c02004086890873225957fced"],
				operate: "diff",
				type: "sku"
			},
			{
				ids: ["ff80808165a604420165e2001af046f0","ff80808165a6043f0165e216150546f2"],
				operate: "intersect",
				type: "stdGroup" 
			}
		]
	],
	source: 1
}