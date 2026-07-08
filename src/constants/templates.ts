import { QuizTemplate } from './templates';
import { generateId } from '@/utils';

export const QUIZ_TEMPLATES: QuizTemplate[] = [
  {
    "id": "jomon-period",
    "title": "縄文時代",
    "description": "縄文土器から三内丸山遺跡まで、縄文時代の生活と文化を網羅した20問。",
    "category": "社会",
    "subcategory": "歴史",
    "questions": [
      {
        "type": "multiple-choice",
        "text": "縄文時代に使われていた、表面に縄の目の文様がある土器は？",
        "choices": [
          {
            "id": "d9797981",
            "text": "縄文土器",
            "isCorrect": true
          },
          {
            "id": "a749e29d",
            "text": "弥生土器",
            "isCorrect": false
          },
          {
            "id": "9e257d16",
            "text": "須恵器",
            "isCorrect": false
          },
          {
            "id": "529cf8cf",
            "text": "土師器",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "縄文土器は低温で焼かれ、厚手で黒褐色なのが特徴です。",
        "imageUrl": null,
        "order": 0
      },
      {
        "type": "multiple-choice",
        "text": "縄文時代の人々が住んでいた、地面を掘り下げた住居は？",
        "choices": [
          {
            "id": "ad5d035c",
            "text": "竪穴住居",
            "isCorrect": true
          },
          {
            "id": "5e130d53",
            "text": "高床住居",
            "isCorrect": false
          },
          {
            "id": "2a4442e0",
            "text": "寝殿造",
            "isCorrect": false
          },
          {
            "id": "2ad343fe",
            "text": "書院造",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "地面を掘り下げて床にした竪穴住居が一般的でした。",
        "imageUrl": null,
        "order": 1
      },
      {
        "type": "multiple-choice",
        "text": "縄文時代のゴミ捨て場で、当時の食生活がわかる場所は？",
        "choices": [
          {
            "id": "80914b62",
            "text": "貝塚",
            "isCorrect": true
          },
          {
            "id": "d65948c2",
            "text": "古墳",
            "isCorrect": false
          },
          {
            "id": "9bb6a1a7",
            "text": "都城",
            "isCorrect": false
          },
          {
            "id": "1d7f34c4",
            "text": "環濠",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "貝塚からは貝殻や魚の骨、土器の破片などが見つかります。",
        "imageUrl": null,
        "order": 2
      },
      {
        "type": "multiple-choice",
        "text": "魔除けや豊作を祈って作られた、女性をかたどった土の人形は？",
        "choices": [
          {
            "id": "d1ad3d71",
            "text": "土偶",
            "isCorrect": true
          },
          {
            "id": "50757d19",
            "text": "埴輪",
            "isCorrect": false
          },
          {
            "id": "ae7f16bb",
            "text": "銅鐸",
            "isCorrect": false
          },
          {
            "id": "3bfb0de4",
            "text": "石包丁",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "土偶は縄文時代の精神生活を示す重要な遺物です。",
        "imageUrl": null,
        "order": 3
      },
      {
        "type": "multiple-choice",
        "text": "青森県にある、縄文時代最大級の集落跡は？",
        "choices": [
          {
            "id": "715ee059",
            "text": "三内丸山遺跡",
            "isCorrect": true
          },
          {
            "id": "d15928e6",
            "text": "吉野ヶ里遺跡",
            "isCorrect": false
          },
          {
            "id": "99eecbba",
            "text": "登呂遺跡",
            "isCorrect": false
          },
          {
            "id": "309a250e",
            "text": "板付遺跡",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "巨大な木柱跡や多くの竪穴住居跡が見つかっています。",
        "imageUrl": null,
        "order": 4
      },
      {
        "type": "multiple-choice",
        "text": "縄文時代に使われた石器で、表面を磨いて作られたものは？",
        "choices": [
          {
            "id": "12e324dc",
            "text": "磨製石器",
            "isCorrect": true
          },
          {
            "id": "8033bd76",
            "text": "打製石器",
            "isCorrect": false
          },
          {
            "id": "7b3d591c",
            "text": "鉄器",
            "isCorrect": false
          },
          {
            "id": "06bfd218",
            "text": "青銅器",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "縄文時代は新石器時代にあたり、磨製石器が使われました。",
        "imageUrl": null,
        "order": 5
      },
      {
        "type": "multiple-choice",
        "text": "縄文時代、狩猟のために新しく発達した道具は？",
        "choices": [
          {
            "id": "63284651",
            "text": "弓矢",
            "isCorrect": true
          },
          {
            "id": "4a6d20b3",
            "text": "鉄砲",
            "isCorrect": false
          },
          {
            "id": "c78ccb23",
            "text": "刀",
            "isCorrect": false
          },
          {
            "id": "e3001943",
            "text": "槍",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "素早い小動物を仕留めるために弓矢が使われました。",
        "imageUrl": null,
        "order": 6
      },
      {
        "type": "multiple-choice",
        "text": "縄文時代、食料の煮炊きや保存に使われた道具は？",
        "choices": [
          {
            "id": "a0d185c1",
            "text": "土器",
            "isCorrect": true
          },
          {
            "id": "440201f7",
            "text": "木箱",
            "isCorrect": false
          },
          {
            "id": "ac9ba2a6",
            "text": "冷蔵庫",
            "isCorrect": false
          },
          {
            "id": "ac886192",
            "text": "石皿",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "土器の出現により、食生活が大きく安定しました。",
        "imageUrl": null,
        "order": 7
      },
      {
        "type": "multiple-choice",
        "text": "縄文時代、交易に使われた長野県や北海道産の黒い石は？",
        "choices": [
          {
            "id": "34d05dda",
            "text": "黒曜石",
            "isCorrect": true
          },
          {
            "id": "e6f80764",
            "text": "ダイヤモンド",
            "isCorrect": false
          },
          {
            "id": "d220531f",
            "text": "大理石",
            "isCorrect": false
          },
          {
            "id": "4463ac7b",
            "text": "石灰岩",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "黒曜石は鋭い刃物（石器）の材料として広く流通しました。",
        "imageUrl": null,
        "order": 8
      },
      {
        "type": "multiple-choice",
        "text": "新潟県糸魚川周辺でとれ、アクセサリーに使われた緑色の石は？",
        "choices": [
          {
            "id": "8aca1873",
            "text": "翡翠（ヒスイ）",
            "isCorrect": true
          },
          {
            "id": "4de35ae3",
            "text": "ルビー",
            "isCorrect": false
          },
          {
            "id": "081f9a21",
            "text": "サファイア",
            "isCorrect": false
          },
          {
            "id": "e0769e17",
            "text": "エメラルド",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "ヒスイは縄文時代の代表的な装飾品の材料です。",
        "imageUrl": null,
        "order": 9
      }
    ]
  },
  {
    "id": "yayoi-period",
    "title": "弥生時代",
    "description": "稲作、金属器、卑弥呼、クニの成立など弥生時代の重要事項20問。",
    "category": "社会",
    "subcategory": "歴史",
    "questions": [
      {
        "type": "multiple-choice",
        "text": "弥生時代に大陸から伝わり、生活の基盤となった農業は？",
        "choices": [
          {
            "id": "cee63ca9",
            "text": "水田稲作",
            "isCorrect": true
          },
          {
            "id": "8237b7eb",
            "text": "畑作",
            "isCorrect": false
          },
          {
            "id": "1cdf81ac",
            "text": "酪農",
            "isCorrect": false
          },
          {
            "id": "7e250db3",
            "text": "果樹園",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "稲作の伝来により、定住と組織化が進みました。",
        "imageUrl": null,
        "order": 0
      },
      {
        "type": "multiple-choice",
        "text": "弥生土器の特徴として正しいものは？",
        "choices": [
          {
            "id": "e2c708d1",
            "text": "薄手で赤褐色、硬い",
            "isCorrect": true
          },
          {
            "id": "fdea5ae0",
            "text": "厚手で黒褐色、柔らかい",
            "isCorrect": false
          },
          {
            "id": "0b4a9f64",
            "text": "釉薬が塗られている",
            "isCorrect": false
          },
          {
            "id": "5d7c9155",
            "text": "文様が非常に複雑",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "弥生土器は縄文土器よりも高温で焼かれ、実用的でした。",
        "imageUrl": null,
        "order": 1
      },
      {
        "type": "multiple-choice",
        "text": "弥生時代に稲を保存するために造られた建物は？",
        "choices": [
          {
            "id": "bc3e06ed",
            "text": "高床倉庫",
            "isCorrect": true
          },
          {
            "id": "f660b415",
            "text": "竪穴住居",
            "isCorrect": false
          },
          {
            "id": "d1d9ef69",
            "text": "石室",
            "isCorrect": false
          },
          {
            "id": "b55eeef2",
            "text": "寝殿",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "湿気やネズミを防ぐために床を高くしました。",
        "imageUrl": null,
        "order": 2
      },
      {
        "type": "multiple-choice",
        "text": "稲の穂をつみとるために使われた石器は？",
        "choices": [
          {
            "id": "8f7fcd3b",
            "text": "石包丁",
            "isCorrect": true
          },
          {
            "id": "f75334e9",
            "text": "磨製石斧",
            "isCorrect": false
          },
          {
            "id": "585b326d",
            "text": "打製石器",
            "isCorrect": false
          },
          {
            "id": "6c93c3b6",
            "text": "石皿",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "穂首刈りを行うための道具です。",
        "imageUrl": null,
        "order": 3
      },
      {
        "type": "multiple-choice",
        "text": "弥生時代に伝わった2種類の金属器は？",
        "choices": [
          {
            "id": "85dbccc8",
            "text": "青銅器と鉄器",
            "isCorrect": true
          },
          {
            "id": "8ef1867f",
            "text": "金と銀",
            "isCorrect": false
          },
          {
            "id": "de8c46f3",
            "text": "アルミニウムと銅",
            "isCorrect": false
          },
          {
            "id": "762dd54f",
            "text": "鉄と金",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "青銅器は祭祀用、鉄器は武器や工具に使われました。",
        "imageUrl": null,
        "order": 4
      },
      {
        "type": "multiple-choice",
        "text": "佐賀県にある、環濠集落の代表的な遺跡は？",
        "choices": [
          {
            "id": "771069f6",
            "text": "吉野ヶ里遺跡",
            "isCorrect": true
          },
          {
            "id": "a24847db",
            "text": "三内丸山遺跡",
            "isCorrect": false
          },
          {
            "id": "d173ab1f",
            "text": "登呂遺跡",
            "isCorrect": false
          },
          {
            "id": "3d1d5c4b",
            "text": "板付遺跡",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "物見やぐらや柵を備えた大規模な集落跡です。",
        "imageUrl": null,
        "order": 5
      },
      {
        "type": "multiple-choice",
        "text": "「魏志倭人伝」に記された、30余りのクニをまとめた女王は？",
        "choices": [
          {
            "id": "e8573d15",
            "text": "卑弥呼",
            "isCorrect": true
          },
          {
            "id": "f10870a8",
            "text": "持統天皇",
            "isCorrect": false
          },
          {
            "id": "544d91cd",
            "text": "推古天皇",
            "isCorrect": false
          },
          {
            "id": "1a8a5449",
            "text": "北条政子",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "邪馬台国の女王として魏に使いを送りました。",
        "imageUrl": null,
        "order": 6
      },
      {
        "type": "multiple-choice",
        "text": "卑弥呼が魏の皇帝から授かった称号は？",
        "choices": [
          {
            "id": "27f16f3c",
            "text": "親魏倭王",
            "isCorrect": true
          },
          {
            "id": "8abaff77",
            "text": "日本国王",
            "isCorrect": false
          },
          {
            "id": "28243e56",
            "text": "征夷大将軍",
            "isCorrect": false
          },
          {
            "id": "a889fac8",
            "text": "関白",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "金印とともに授けられました。",
        "imageUrl": null,
        "order": 7
      },
      {
        "type": "multiple-choice",
        "text": "1世紀頃、後漢の皇帝から金印を授かったクニは？",
        "choices": [
          {
            "id": "6c4d3447",
            "text": "奴国（なこく）",
            "isCorrect": true
          },
          {
            "id": "e1e40c01",
            "text": "末盧国",
            "isCorrect": false
          },
          {
            "id": "3482652a",
            "text": "伊都国",
            "isCorrect": false
          },
          {
            "id": "dadfd015",
            "text": "邪馬台国",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "「漢委奴国王」と刻まれた金印が志賀島で見つかっています。",
        "imageUrl": null,
        "order": 8
      },
      {
        "type": "multiple-choice",
        "text": "弥生時代、戦いに備えて周囲に堀を巡らせた集落を何という？",
        "choices": [
          {
            "id": "a0261cae",
            "text": "環濠集落",
            "isCorrect": true
          },
          {
            "id": "37fe03ae",
            "text": "平城京",
            "isCorrect": false
          },
          {
            "id": "cc2c9b61",
            "text": "城下町",
            "isCorrect": false
          },
          {
            "id": "8bfc5b95",
            "text": "宿場町",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "土地や水を巡る争いが増えたことを示しています。",
        "imageUrl": null,
        "order": 9
      }
    ]
  },
  {
    "id": "kofun-period",
    "title": "古墳時代",
    "description": "前方後円墳、ヤマト王権、埴輪、渡来人の文化を網羅した20問。",
    "category": "社会",
    "subcategory": "歴史",
    "questions": [
      {
        "type": "multiple-choice",
        "text": "古墳時代に造られた、円形と方形を組み合わせた日本特有の古墳は？",
        "choices": [
          {
            "id": "c7c945d2",
            "text": "前方後円墳",
            "isCorrect": true
          },
          {
            "id": "357fbb57",
            "text": "円墳",
            "isCorrect": false
          },
          {
            "id": "a2c77fcd",
            "text": "方墳",
            "isCorrect": false
          },
          {
            "id": "0ca839cc",
            "text": "八角墳",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "鍵穴のような形が特徴です。",
        "imageUrl": null,
        "order": 0
      },
      {
        "type": "multiple-choice",
        "text": "古墳の周囲に並べられた、素焼きの土製品を何という？",
        "choices": [
          {
            "id": "54af3229",
            "text": "埴輪（はにわ）",
            "isCorrect": true
          },
          {
            "id": "6e47bb5f",
            "text": "土偶",
            "isCorrect": false
          },
          {
            "id": "6ee76910",
            "text": "銅鐸",
            "isCorrect": false
          },
          {
            "id": "d99b8313",
            "text": "勾玉",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "家、馬、人などの形があり、死者の霊を守るなどの意味がありました。",
        "imageUrl": null,
        "order": 1
      },
      {
        "type": "multiple-choice",
        "text": "近畿地方を中心に成立し、日本を統一していった勢力は？",
        "choices": [
          {
            "id": "d59f43e1",
            "text": "ヤマト王権（大和朝廷）",
            "isCorrect": true
          },
          {
            "id": "4ac4e0e5",
            "text": "邪馬台国",
            "isCorrect": false
          },
          {
            "id": "e2b9c4c2",
            "text": "平氏",
            "isCorrect": false
          },
          {
            "id": "555e169e",
            "text": "源氏",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "大王（おおきみ）を中心とする連合政権です。",
        "imageUrl": null,
        "order": 2
      },
      {
        "type": "multiple-choice",
        "text": "日本最大の前方後円墳で、大仙陵古墳（仁徳天皇陵）がある場所は？",
        "choices": [
          {
            "id": "cb482e73",
            "text": "大阪府堺市",
            "isCorrect": true
          },
          {
            "id": "169d4d79",
            "text": "奈良県明日香村",
            "isCorrect": false
          },
          {
            "id": "289697f9",
            "text": "滋賀県大津市",
            "isCorrect": false
          },
          {
            "id": "d5361d9d",
            "text": "福岡県太宰府市",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "世界最大級の面積を誇るお墓です。",
        "imageUrl": null,
        "order": 3
      },
      {
        "type": "multiple-choice",
        "text": "朝鮮半島や中国から移り住み、新しい技術や文化を伝えた人々は？",
        "choices": [
          {
            "id": "fe7b73a8",
            "text": "渡来人",
            "isCorrect": true
          },
          {
            "id": "c83af549",
            "text": "遣隋使",
            "isCorrect": false
          },
          {
            "id": "7693d42c",
            "text": "遣唐使",
            "isCorrect": false
          },
          {
            "id": "87014338",
            "text": "御家人",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "漢字、仏教、儒教、養蚕、陶芸などを伝えました。",
        "imageUrl": null,
        "order": 4
      },
      {
        "type": "multiple-choice",
        "text": "古墳時代の末期に大陸から伝わった、硬くて灰色の土器は？",
        "choices": [
          {
            "id": "f3f1a0a9",
            "text": "須恵器（すえき）",
            "isCorrect": true
          },
          {
            "id": "edb4eb28",
            "text": "土師器",
            "isCorrect": false
          },
          {
            "id": "035a40e9",
            "text": "弥生土器",
            "isCorrect": false
          },
          {
            "id": "2fe6c10b",
            "text": "縄文土器",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "高温で焼かれ、実用的な器として使われました。",
        "imageUrl": null,
        "order": 5
      },
      {
        "type": "multiple-choice",
        "text": "ヤマト王権の首長を何と呼んでいましたか？",
        "choices": [
          {
            "id": "bd43e997",
            "text": "大王（おおきみ）",
            "isCorrect": true
          },
          {
            "id": "01b00423",
            "text": "将軍",
            "isCorrect": false
          },
          {
            "id": "e37e8e7c",
            "text": "天皇",
            "isCorrect": false
          },
          {
            "id": "83e45637",
            "text": "関白",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "後に「天皇」という称号に変わっていきます。",
        "imageUrl": null,
        "order": 6
      },
      {
        "type": "multiple-choice",
        "text": "埼玉県や熊本県の古墳から見つかった、文字が刻まれた剣は？",
        "choices": [
          {
            "id": "8eaf3101",
            "text": "鉄剣（金錯銘鉄剣）",
            "isCorrect": true
          },
          {
            "id": "a86cf4d9",
            "text": "草薙剣",
            "isCorrect": false
          },
          {
            "id": "a3d69227",
            "text": "十握剣",
            "isCorrect": false
          },
          {
            "id": "d3c6b0a0",
            "text": "村正",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "ワカタケル大王（雄略天皇）の名が刻まれていました。",
        "imageUrl": null,
        "order": 7
      },
      {
        "type": "multiple-choice",
        "text": "古墳時代、ヤマト王権が朝鮮半島のどこから鉄資源を得ていた？",
        "choices": [
          {
            "id": "faf364b7",
            "text": "加羅（伽耶）",
            "isCorrect": true
          },
          {
            "id": "2f4ac9a0",
            "text": "高句麗",
            "isCorrect": false
          },
          {
            "id": "52ba6d2b",
            "text": "新羅",
            "isCorrect": false
          },
          {
            "id": "68ce7d50",
            "text": "百済",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "半島の南部と密接な関係がありました。",
        "imageUrl": null,
        "order": 8
      },
      {
        "type": "multiple-choice",
        "text": "古墳の内部に造られた、死者を安置するための部屋を何という？",
        "choices": [
          {
            "id": "97cc13cd",
            "text": "石室（せきしつ）",
            "isCorrect": true
          },
          {
            "id": "680d9850",
            "text": "本堂",
            "isCorrect": false
          },
          {
            "id": "639b80c5",
            "text": "寝殿",
            "isCorrect": false
          },
          {
            "id": "a0de91ca",
            "text": "竪穴",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "竪穴式石室から、後に横穴式石室へと変化しました。",
        "imageUrl": null,
        "order": 9
      }
    ]
  },
  {
    "id": "asuka-period",
    "title": "飛鳥時代",
    "description": "聖徳太子、大化の改新、律令国家への歩みを網羅した20問。",
    "category": "社会",
    "subcategory": "歴史",
    "questions": [
      {
        "type": "multiple-choice",
        "text": "推古天皇の摂政として、冠位十二階や十七条の憲法を定めたのは？",
        "choices": [
          {
            "id": "161e4fde",
            "text": "聖徳太子",
            "isCorrect": true
          },
          {
            "id": "1595d96b",
            "text": "中大兄皇子",
            "isCorrect": false
          },
          {
            "id": "2912fc3c",
            "text": "中臣鎌足",
            "isCorrect": false
          },
          {
            "id": "a32857f1",
            "text": "蘇我馬子",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "天皇中心の国造りを目指しました。",
        "imageUrl": null,
        "order": 0
      },
      {
        "type": "multiple-choice",
        "text": "聖徳太子が定めた、家柄ではなく能力で役人を採用する制度は？",
        "choices": [
          {
            "id": "c2dd34f5",
            "text": "冠位十二階",
            "isCorrect": true
          },
          {
            "id": "42632dc7",
            "text": "十七条の憲法",
            "isCorrect": false
          },
          {
            "id": "58a088e7",
            "text": "班田収授法",
            "isCorrect": false
          },
          {
            "id": "74663e29",
            "text": "氏姓制度",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "冠の色で位を表しました。",
        "imageUrl": null,
        "order": 1
      },
      {
        "type": "multiple-choice",
        "text": "聖徳太子が定めた、役人の心得を記した決まりは？",
        "choices": [
          {
            "id": "2e8fd849",
            "text": "十七条の憲法",
            "isCorrect": true
          },
          {
            "id": "6917c452",
            "text": "大宝律令",
            "isCorrect": false
          },
          {
            "id": "b8d455a4",
            "text": "御成敗式目",
            "isCorrect": false
          },
          {
            "id": "1c2e2576",
            "text": "武家諸法度",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "「和を以て貴しとなす」という言葉が有名です。",
        "imageUrl": null,
        "order": 2
      },
      {
        "type": "multiple-choice",
        "text": "聖徳太子が中国（隋）に送った使節を何という？",
        "choices": [
          {
            "id": "96710572",
            "text": "遣隋使",
            "isCorrect": true
          },
          {
            "id": "55435455",
            "text": "遣唐使",
            "isCorrect": false
          },
          {
            "id": "2bd77368",
            "text": "遣新羅使",
            "isCorrect": false
          },
          {
            "id": "1eed4596",
            "text": "通信使",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "小野妹子らが送られました。",
        "imageUrl": null,
        "order": 3
      },
      {
        "type": "multiple-choice",
        "text": "聖徳太子が建立した、世界最古の木造建築がある寺は？",
        "choices": [
          {
            "id": "b1c13331",
            "text": "法隆寺",
            "isCorrect": true
          },
          {
            "id": "200f3e25",
            "text": "四天王寺",
            "isCorrect": false
          },
          {
            "id": "47cc6566",
            "text": "東大寺",
            "isCorrect": false
          },
          {
            "id": "1e04736f",
            "text": "興福寺",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "飛鳥文化を代表する寺院です。",
        "imageUrl": null,
        "order": 4
      },
      {
        "type": "multiple-choice",
        "text": "645年、中大兄皇子と中臣鎌足が蘇我氏を倒して始めた改革は？",
        "choices": [
          {
            "id": "901bc82e",
            "text": "大化の改新",
            "isCorrect": true
          },
          {
            "id": "1c882c03",
            "text": "壬申の乱",
            "isCorrect": false
          },
          {
            "id": "66b2856d",
            "text": "建武の新政",
            "isCorrect": false
          },
          {
            "id": "c234d072",
            "text": "明治維新",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "公地公民の制を目指しました。",
        "imageUrl": null,
        "order": 5
      },
      {
        "type": "multiple-choice",
        "text": "大化の改新を始めた、後の中大兄皇子（天智天皇）の協力者は？",
        "choices": [
          {
            "id": "e45336c4",
            "text": "中臣鎌足（藤原鎌足）",
            "isCorrect": true
          },
          {
            "id": "8fb43af0",
            "text": "蘇我入鹿",
            "isCorrect": false
          },
          {
            "id": "7160f1c2",
            "text": "聖徳太子",
            "isCorrect": false
          },
          {
            "id": "29e0dddb",
            "text": "足利尊氏",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "後に藤原の姓を授かりました。",
        "imageUrl": null,
        "order": 6
      },
      {
        "type": "multiple-choice",
        "text": "663年、日本が百済を助けるために唐・新羅の連合軍と戦ったのは？",
        "choices": [
          {
            "id": "c35ee22d",
            "text": "白村江（はくすきのえ）の戦い",
            "isCorrect": true
          },
          {
            "id": "58cf9da7",
            "text": "元寇",
            "isCorrect": false
          },
          {
            "id": "ee3d3da0",
            "text": "文禄の役",
            "isCorrect": false
          },
          {
            "id": "919ea575",
            "text": "壬申の乱",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "日本は大敗し、防人の設置など国防を強化しました。",
        "imageUrl": null,
        "order": 7
      },
      {
        "type": "multiple-choice",
        "text": "天智天皇の死後、大友皇子と大海人皇子が争った内乱は？",
        "choices": [
          {
            "id": "75a9e1c2",
            "text": "壬申の乱",
            "isCorrect": true
          },
          {
            "id": "15f10bac",
            "text": "承久の乱",
            "isCorrect": false
          },
          {
            "id": "1d46406e",
            "text": "応仁の乱",
            "isCorrect": false
          },
          {
            "id": "d9bdb3bb",
            "text": "保元の乱",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "大海人皇子が勝利し、天武天皇となりました。",
        "imageUrl": null,
        "order": 8
      },
      {
        "type": "multiple-choice",
        "text": "天武天皇が建設を始め、持統天皇の時に完成した本格的な都は？",
        "choices": [
          {
            "id": "f62eac95",
            "text": "藤原京",
            "isCorrect": true
          },
          {
            "id": "cf70b582",
            "text": "平城京",
            "isCorrect": false
          },
          {
            "id": "526e999e",
            "text": "平安京",
            "isCorrect": false
          },
          {
            "id": "df98f946",
            "text": "難波京",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "中国の都にならった最初の本格的な都城です。",
        "imageUrl": null,
        "order": 9
      }
    ]
  },
  {
    "id": "nara-period",
    "title": "奈良時代",
    "description": "平城京、墾田永年私財法、天平文化、遣唐使を網羅した20問。",
    "category": "社会",
    "subcategory": "歴史",
    "questions": [
      {
        "type": "multiple-choice",
        "text": "710年、唐の長安にならって奈良に造られた都は？",
        "choices": [
          {
            "id": "efc3ec37",
            "text": "平城京",
            "isCorrect": true
          },
          {
            "id": "dc92d5bd",
            "text": "平安京",
            "isCorrect": false
          },
          {
            "id": "03924a7a",
            "text": "藤原京",
            "isCorrect": false
          },
          {
            "id": "6c8c4f59",
            "text": "難波京",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "元明天皇の時に遷都されました。",
        "imageUrl": null,
        "order": 0
      },
      {
        "type": "multiple-choice",
        "text": "743年、新しく耕した土地を永久に自分のものにして良いとした法は？",
        "choices": [
          {
            "id": "ccefcd8d",
            "text": "墾田永年私財法",
            "isCorrect": true
          },
          {
            "id": "01e5beef",
            "text": "班田収授法",
            "isCorrect": false
          },
          {
            "id": "5f643d54",
            "text": "三世一身の法",
            "isCorrect": false
          },
          {
            "id": "47c61f94",
            "text": "地租改正",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "これにより公地公民の原則が崩れ、荘園が生まれるきっかけとなりました。",
        "imageUrl": null,
        "order": 1
      },
      {
        "type": "multiple-choice",
        "text": "聖武天皇の時代を中心に、唐の影響を強く受けて栄えた文化は？",
        "choices": [
          {
            "id": "79869ec7",
            "text": "天平文化",
            "isCorrect": true
          },
          {
            "id": "5b384f20",
            "text": "飛鳥文化",
            "isCorrect": false
          },
          {
            "id": "051cb254",
            "text": "白鳳文化",
            "isCorrect": false
          },
          {
            "id": "1584a205",
            "text": "国風文化",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "国際色豊かな文化です。",
        "imageUrl": null,
        "order": 2
      },
      {
        "type": "multiple-choice",
        "text": "聖武天皇が奈良の東大寺に造らせた巨大な像は？",
        "choices": [
          {
            "id": "10baf877",
            "text": "大仏（盧舎那仏）",
            "isCorrect": true
          },
          {
            "id": "ebef0d17",
            "text": "釈迦三尊像",
            "isCorrect": false
          },
          {
            "id": "1f13755f",
            "text": "阿弥陀如来像",
            "isCorrect": false
          },
          {
            "id": "bc4382f6",
            "text": "弥勒菩薩像",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "仏教の力で国を守ろうとしました。",
        "imageUrl": null,
        "order": 3
      },
      {
        "type": "multiple-choice",
        "text": "聖武天皇の遺品などが納められている、東大寺の倉は？",
        "choices": [
          {
            "id": "7886c322",
            "text": "正倉院",
            "isCorrect": true
          },
          {
            "id": "0db29024",
            "text": "高床倉庫",
            "isCorrect": false
          },
          {
            "id": "3dda587e",
            "text": "宝物殿",
            "isCorrect": false
          },
          {
            "id": "61194898",
            "text": "金閣",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "校倉造（あぜくらづくり）で有名です。",
        "imageUrl": null,
        "order": 4
      },
      {
        "type": "multiple-choice",
        "text": "日本に正しい戒律を伝えるため、5度の失敗を乗り越え来日した僧は？",
        "choices": [
          {
            "id": "17a3e800",
            "text": "鑑真（がんじん）",
            "isCorrect": true
          },
          {
            "id": "14536117",
            "text": "空海",
            "isCorrect": false
          },
          {
            "id": "7cb3c4b8",
            "text": "最澄",
            "isCorrect": false
          },
          {
            "id": "692b5086",
            "text": "行基",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "唐招提寺を建立しました。",
        "imageUrl": null,
        "order": 5
      },
      {
        "type": "multiple-choice",
        "text": "大仏建立のために民衆をまとめ、橋や堤防を造るなど社会貢献した僧は？",
        "choices": [
          {
            "id": "ee09da86",
            "text": "行基（ぎょうき）",
            "isCorrect": true
          },
          {
            "id": "ab770228",
            "text": "鑑真",
            "isCorrect": false
          },
          {
            "id": "e25bb4ba",
            "text": "道鏡",
            "isCorrect": false
          },
          {
            "id": "df98d8c9",
            "text": "一遍",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "後に大僧正の位を授かりました。",
        "imageUrl": null,
        "order": 6
      },
      {
        "type": "multiple-choice",
        "text": "奈良時代、日本から唐へ送られた使節を何という？",
        "choices": [
          {
            "id": "b194aeb7",
            "text": "遣唐使",
            "isCorrect": true
          },
          {
            "id": "2955c230",
            "text": "遣隋使",
            "isCorrect": false
          },
          {
            "id": "c61bfcf5",
            "text": "遣新羅使",
            "isCorrect": false
          },
          {
            "id": "6e99426a",
            "text": "朝鮮通信使",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "阿倍仲麻呂や吉備真備らが活躍しました。",
        "imageUrl": null,
        "order": 7
      },
      {
        "type": "multiple-choice",
        "text": "日本最古の和歌集で、防人や農民の歌も収められているのは？",
        "choices": [
          {
            "id": "5b825972",
            "text": "万葉集",
            "isCorrect": true
          },
          {
            "id": "cdb62f78",
            "text": "古今和歌集",
            "isCorrect": false
          },
          {
            "id": "31e6aa45",
            "text": "新古今和歌集",
            "isCorrect": false
          },
          {
            "id": "8776e887",
            "text": "懐風藻",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "大伴家持らが編纂に関わったとされます。",
        "imageUrl": null,
        "order": 8
      },
      {
        "type": "multiple-choice",
        "text": "日本最古の歴史書で、神話から推古天皇までを記したものは？",
        "choices": [
          {
            "id": "7052d840",
            "text": "古事記",
            "isCorrect": true
          },
          {
            "id": "f9f097d5",
            "text": "日本書紀",
            "isCorrect": false
          },
          {
            "id": "dd7d76f3",
            "text": "風土記",
            "isCorrect": false
          },
          {
            "id": "409de0af",
            "text": "万葉集",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "稗田阿礼が暗記し、太安万侶が書き留めました。",
        "imageUrl": null,
        "order": 9
      }
    ]
  },
  {
    "id": "heian-period",
    "title": "平安時代",
    "description": "平安京、摂関政治、院政、国風文化、武士の台頭を網羅した20問。",
    "category": "社会",
    "subcategory": "歴史",
    "questions": [
      {
        "type": "multiple-choice",
        "text": "794年、桓武天皇が京都に遷した新しい都は？",
        "choices": [
          {
            "id": "16124021",
            "text": "平安京",
            "isCorrect": true
          },
          {
            "id": "a4c14055",
            "text": "平城京",
            "isCorrect": false
          },
          {
            "id": "f56470d8",
            "text": "長岡京",
            "isCorrect": false
          },
          {
            "id": "1afec6b5",
            "text": "恭仁京",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "「鳴くよ（794）ウグイス平安京」で覚えられます。",
        "imageUrl": null,
        "order": 0
      },
      {
        "type": "multiple-choice",
        "text": "桓武天皇によって東北地方へ派遣された、初代征夷大将軍は？",
        "choices": [
          {
            "id": "88fbd840",
            "text": "坂上田村麻呂",
            "isCorrect": true
          },
          {
            "id": "9e88dbe5",
            "text": "源頼朝",
            "isCorrect": false
          },
          {
            "id": "b1950de3",
            "text": "足利尊氏",
            "isCorrect": false
          },
          {
            "id": "ba232f04",
            "text": "徳川家康",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "アテルイ率いる蝦夷の抵抗を抑えました。",
        "imageUrl": null,
        "order": 1
      },
      {
        "type": "multiple-choice",
        "text": "平安時代、藤原氏が娘を天皇の后にして実権を握った政治は？",
        "choices": [
          {
            "id": "8f275833",
            "text": "摂関政治",
            "isCorrect": true
          },
          {
            "id": "093932bb",
            "text": "院政",
            "isCorrect": false
          },
          {
            "id": "3c3900d9",
            "text": "執権政治",
            "isCorrect": false
          },
          {
            "id": "9483b734",
            "text": "親政",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "摂政や関白の職を独占しました。",
        "imageUrl": null,
        "order": 2
      },
      {
        "type": "multiple-choice",
        "text": "「この世をば わが世とぞ思う...」と詠んだ、摂関政治全盛期の人物は？",
        "choices": [
          {
            "id": "0a70cc2f",
            "text": "藤原道長",
            "isCorrect": true
          },
          {
            "id": "07166b68",
            "text": "藤原頼通",
            "isCorrect": false
          },
          {
            "id": "6140a459",
            "text": "藤原良房",
            "isCorrect": false
          },
          {
            "id": "dd1901ac",
            "text": "藤原基経",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "4人の娘を次々と中宮や皇后にしました。",
        "imageUrl": null,
        "order": 3
      },
      {
        "type": "multiple-choice",
        "text": "藤原頼通が宇治に建立した、極楽浄土を象徴する建物は？",
        "choices": [
          {
            "id": "b319b519",
            "text": "平等院鳳凰堂",
            "isCorrect": true
          },
          {
            "id": "0ec82aaa",
            "text": "金閣",
            "isCorrect": false
          },
          {
            "id": "feafdb69",
            "text": "銀閣",
            "isCorrect": false
          },
          {
            "id": "5ddaf4f7",
            "text": "法隆寺",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "10円玉のデザインにもなっています。",
        "imageUrl": null,
        "order": 4
      },
      {
        "type": "multiple-choice",
        "text": "894年、菅原道真の提案で中止された中国への派遣事業は？",
        "choices": [
          {
            "id": "d6c46970",
            "text": "遣唐使",
            "isCorrect": true
          },
          {
            "id": "80ff9b1c",
            "text": "遣隋使",
            "isCorrect": false
          },
          {
            "id": "19ecbf56",
            "text": "通信使",
            "isCorrect": false
          },
          {
            "id": "42fb2e1a",
            "text": "南蛮貿易",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "「白紙（894）に戻そう遣唐使」で有名です。",
        "imageUrl": null,
        "order": 5
      },
      {
        "type": "multiple-choice",
        "text": "遣唐使の中止後、日本の風土に合った独自の文化が発達した。これを？",
        "choices": [
          {
            "id": "c53cf13e",
            "text": "国風文化",
            "isCorrect": true
          },
          {
            "id": "ea9da28e",
            "text": "天平文化",
            "isCorrect": false
          },
          {
            "id": "56a40eba",
            "text": "元禄文化",
            "isCorrect": false
          },
          {
            "id": "1de155bf",
            "text": "東山文化",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "ひらがなやカタカナが普及しました。",
        "imageUrl": null,
        "order": 6
      },
      {
        "type": "multiple-choice",
        "text": "紫式部によって書かれた、かな文字による世界最古級の長編小説は？",
        "choices": [
          {
            "id": "ae3af68d",
            "text": "源氏物語",
            "isCorrect": true
          },
          {
            "id": "b94a95c1",
            "text": "枕草子",
            "isCorrect": false
          },
          {
            "id": "821f72cb",
            "text": "竹取物語",
            "isCorrect": false
          },
          {
            "id": "e4aa5ff6",
            "text": "伊勢物語",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "貴族社会の恋愛や人間模様を描きました。",
        "imageUrl": null,
        "order": 7
      },
      {
        "type": "multiple-choice",
        "text": "清少納言によって書かれた、「春はあけぼの」で始まる随筆は？",
        "choices": [
          {
            "id": "cb75b522",
            "text": "枕草子",
            "isCorrect": true
          },
          {
            "id": "b1bbd43c",
            "text": "源氏物語",
            "isCorrect": false
          },
          {
            "id": "be0a8452",
            "text": "土佐日記",
            "isCorrect": false
          },
          {
            "id": "2b3185af",
            "text": "更級日記",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "鋭い観察眼で宮廷生活を記しました。",
        "imageUrl": null,
        "order": 8
      },
      {
        "type": "multiple-choice",
        "text": "平安時代、天皇が譲位した後に「上皇」として政治を行う仕組みは？",
        "choices": [
          {
            "id": "b96d3ced",
            "text": "院政",
            "isCorrect": true
          },
          {
            "id": "12f7f464",
            "text": "摂関政治",
            "isCorrect": false
          },
          {
            "id": "e56c0993",
            "text": "執権政治",
            "isCorrect": false
          },
          {
            "id": "aa9ccd15",
            "text": "公議政体",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "白河上皇が始めました。",
        "imageUrl": null,
        "order": 9
      }
    ]
  },
  {
    "id": "kamakura-period",
    "title": "鎌倉時代",
    "description": "源頼朝、執権政治、元寇、鎌倉文化・仏教を網羅した20問。",
    "category": "社会",
    "subcategory": "歴史",
    "questions": [
      {
        "type": "multiple-choice",
        "text": "1192年、征夷大将軍に任命され鎌倉幕府を開いたのは？",
        "choices": [
          {
            "id": "cac0a874",
            "text": "源頼朝",
            "isCorrect": true
          },
          {
            "id": "55c9375f",
            "text": "源義経",
            "isCorrect": false
          },
          {
            "id": "82cccfd4",
            "text": "北条時政",
            "isCorrect": false
          },
          {
            "id": "6bce9e4d",
            "text": "足利尊氏",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "日本初の本格的な武家政権です。",
        "imageUrl": null,
        "order": 0
      },
      {
        "type": "multiple-choice",
        "text": "将軍と御家人の間の「恩恵」と「奉仕」の関係を何という？",
        "choices": [
          {
            "id": "6d9bfbfb",
            "text": "御恩と奉公",
            "isCorrect": true
          },
          {
            "id": "cc27da87",
            "text": "下剋上",
            "isCorrect": false
          },
          {
            "id": "94122c6d",
            "text": "封建制",
            "isCorrect": false
          },
          {
            "id": "17ad0710",
            "text": "寄進",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "土地を仲立ちとした主従関係です。",
        "imageUrl": null,
        "order": 1
      },
      {
        "type": "multiple-choice",
        "text": "源頼朝が全国の国ごとに置いた、軍事・警察担当の役職は？",
        "choices": [
          {
            "id": "702ab8ec",
            "text": "守護",
            "isCorrect": true
          },
          {
            "id": "3fde12bf",
            "text": "地頭",
            "isCorrect": false
          },
          {
            "id": "515c84c1",
            "text": "管領",
            "isCorrect": false
          },
          {
            "id": "1048553f",
            "text": "探題",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "主に御家人が任命されました。",
        "imageUrl": null,
        "order": 2
      },
      {
        "type": "multiple-choice",
        "text": "源頼朝が荘園や公領ごとに置いた、徴税・管理担当の役職は？",
        "choices": [
          {
            "id": "b367d047",
            "text": "地頭",
            "isCorrect": true
          },
          {
            "id": "b7781a93",
            "text": "守護",
            "isCorrect": false
          },
          {
            "id": "bb7b87cc",
            "text": "検非違使",
            "isCorrect": false
          },
          {
            "id": "2ec9b6ef",
            "text": "執権",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "土地の管理実務を担いました。",
        "imageUrl": null,
        "order": 3
      },
      {
        "type": "multiple-choice",
        "text": "頼朝の死後、幕府の実権を握った北条氏が就いた役職は？",
        "choices": [
          {
            "id": "cb24fda3",
            "text": "執権",
            "isCorrect": true
          },
          {
            "id": "5bba2ca0",
            "text": "将軍",
            "isCorrect": false
          },
          {
            "id": "a92cd977",
            "text": "関白",
            "isCorrect": false
          },
          {
            "id": "a074c3ad",
            "text": "管領",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "北条時政・義時らが確立しました。",
        "imageUrl": null,
        "order": 4
      },
      {
        "type": "multiple-choice",
        "text": "1221年、後鳥羽上皇が幕府を倒そうとして起こした内乱は？",
        "choices": [
          {
            "id": "92a50047",
            "text": "承久の乱",
            "isCorrect": true
          },
          {
            "id": "d31b4251",
            "text": "壬申の乱",
            "isCorrect": false
          },
          {
            "id": "6badb2f7",
            "text": "応仁の乱",
            "isCorrect": false
          },
          {
            "id": "ceddb5ad",
            "text": "保元の乱",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "幕府側が勝利し、朝廷への支配力が強まりました。",
        "imageUrl": null,
        "order": 5
      },
      {
        "type": "multiple-choice",
        "text": "承久の乱の後、朝廷を監視するために京都に置かれた役所は？",
        "choices": [
          {
            "id": "5b19aed5",
            "text": "六波羅探題",
            "isCorrect": true
          },
          {
            "id": "5a452d27",
            "text": "大宰府",
            "isCorrect": false
          },
          {
            "id": "f6d218c8",
            "text": "鎌倉府",
            "isCorrect": false
          },
          {
            "id": "3742c9a3",
            "text": "京都所司代",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "西国の統治も担当しました。",
        "imageUrl": null,
        "order": 6
      },
      {
        "type": "multiple-choice",
        "text": "1232年、北条泰時が定めた武士のための最初の法律は？",
        "choices": [
          {
            "id": "7c71d3c4",
            "text": "御成敗式目（貞永式目）",
            "isCorrect": true
          },
          {
            "id": "6ee3b567",
            "text": "十七条の憲法",
            "isCorrect": false
          },
          {
            "id": "77d54648",
            "text": "武家諸法度",
            "isCorrect": false
          },
          {
            "id": "1863aa93",
            "text": "公事方御定書",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "裁判の基準を明確にしました。",
        "imageUrl": null,
        "order": 7
      },
      {
        "type": "multiple-choice",
        "text": "13世紀後半、2度にわたり日本に攻めてきたモンゴル帝国（元）の軍を？",
        "choices": [
          {
            "id": "cb15da90",
            "text": "元寇（文永・弘安の役）",
            "isCorrect": true
          },
          {
            "id": "e355c3ab",
            "text": "刀伊の入寇",
            "isCorrect": false
          },
          {
            "id": "558ee8e4",
            "text": "白村江の戦い",
            "isCorrect": false
          },
          {
            "id": "19686449",
            "text": "黒船来航",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "フビライ・ハンの命令で攻めてきました。",
        "imageUrl": null,
        "order": 8
      },
      {
        "type": "multiple-choice",
        "text": "元寇の際、防塁を築くなどして指揮を執った八代執権は？",
        "choices": [
          {
            "id": "89b43a37",
            "text": "北条時宗",
            "isCorrect": true
          },
          {
            "id": "563290b6",
            "text": "北条泰時",
            "isCorrect": false
          },
          {
            "id": "f3c61cf4",
            "text": "北条時政",
            "isCorrect": false
          },
          {
            "id": "9828a053",
            "text": "北条高時",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "禅宗を深く信仰していました。",
        "imageUrl": null,
        "order": 9
      }
    ]
  },
  {
    "id": "nanbokucho-period",
    "title": "南北朝時代",
    "description": "建武の新政、南北朝の動乱、足利尊氏を網羅した20問。",
    "category": "社会",
    "subcategory": "歴史",
    "questions": [
      {
        "type": "multiple-choice",
        "text": "鎌倉幕府滅亡後、後醍醐天皇が始めた天皇中心の政治は？",
        "choices": [
          {
            "id": "88f5c4b8",
            "text": "建武の新政",
            "isCorrect": true
          },
          {
            "id": "dc42ab54",
            "text": "院政",
            "isCorrect": false
          },
          {
            "id": "b203a990",
            "text": "摂関政治",
            "isCorrect": false
          },
          {
            "id": "42c5419f",
            "text": "明治維新",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "武士の不満を買い、短期間で失敗しました。",
        "imageUrl": null,
        "order": 0
      },
      {
        "type": "multiple-choice",
        "text": "建武の新政に反旗を翻し、京都に別の天皇を立てた武将は？",
        "choices": [
          {
            "id": "3a1b6c4c",
            "text": "足利尊氏",
            "isCorrect": true
          },
          {
            "id": "5935e0b2",
            "text": "新田義貞",
            "isCorrect": false
          },
          {
            "id": "4877318c",
            "text": "楠木正成",
            "isCorrect": false
          },
          {
            "id": "7d129cc7",
            "text": "北条高時",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "室町幕府の初代将軍となりました。",
        "imageUrl": null,
        "order": 1
      },
      {
        "type": "multiple-choice",
        "text": "後醍醐天皇が逃れた奈良の場所で、南朝が置かれたのは？",
        "choices": [
          {
            "id": "041a4e1a",
            "text": "吉野",
            "isCorrect": true
          },
          {
            "id": "d73d4a0c",
            "text": "飛鳥",
            "isCorrect": false
          },
          {
            "id": "af83c00e",
            "text": "斑鳩",
            "isCorrect": false
          },
          {
            "id": "46f9b6f6",
            "text": "平城京",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "山深い吉野に朝廷を移しました。",
        "imageUrl": null,
        "order": 2
      },
      {
        "type": "multiple-choice",
        "text": "京都の朝廷（北朝）と吉野の朝廷（南朝）が並立した時代を？",
        "choices": [
          {
            "id": "9d852d99",
            "text": "南北朝時代",
            "isCorrect": true
          },
          {
            "id": "29c4d415",
            "text": "戦国時代",
            "isCorrect": false
          },
          {
            "id": "57db08ef",
            "text": "安土桃山時代",
            "isCorrect": false
          },
          {
            "id": "450af2aa",
            "text": "鎌倉時代",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "約60年間にわたり内乱が続きました。",
        "imageUrl": null,
        "order": 3
      },
      {
        "type": "multiple-choice",
        "text": "南朝側の名将で、湊川の戦いで足利尊氏に敗れた人物は？",
        "choices": [
          {
            "id": "2d59f3c7",
            "text": "楠木正成",
            "isCorrect": true
          },
          {
            "id": "404d82cb",
            "text": "足利直義",
            "isCorrect": false
          },
          {
            "id": "a8a741f7",
            "text": "高師直",
            "isCorrect": false
          },
          {
            "id": "c04bb35e",
            "text": "新田義貞",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "忠臣として後に神格化されました。",
        "imageUrl": null,
        "order": 4
      },
      {
        "type": "multiple-choice",
        "text": "足利尊氏が定めた、室町幕府の政治方針を示す式目は？",
        "choices": [
          {
            "id": "89cd902a",
            "text": "建武式目",
            "isCorrect": true
          },
          {
            "id": "0c77351a",
            "text": "御成敗式目",
            "isCorrect": false
          },
          {
            "id": "db131c5d",
            "text": "武家諸法度",
            "isCorrect": false
          },
          {
            "id": "446cdb75",
            "text": "十七条の憲法",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "鎌倉幕府の政治を継承する姿勢を示しました。",
        "imageUrl": null,
        "order": 5
      },
      {
        "type": "multiple-choice",
        "text": "南北朝の動乱を描いた軍記物語を何という？",
        "choices": [
          {
            "id": "af49e52e",
            "text": "太平記",
            "isCorrect": true
          },
          {
            "id": "374bf545",
            "text": "平家物語",
            "isCorrect": false
          },
          {
            "id": "5ee34031",
            "text": "源氏物語",
            "isCorrect": false
          },
          {
            "id": "2cbc25af",
            "text": "保元物語",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "後醍醐天皇や足利尊氏らの活躍が描かれています。",
        "imageUrl": null,
        "order": 6
      },
      {
        "type": "multiple-choice",
        "text": "足利尊氏と弟の直義が対立し、幕府を二分した内乱は？",
        "choices": [
          {
            "id": "efd3809a",
            "text": "観応の擾乱（かんのうのじょうらん）",
            "isCorrect": true
          },
          {
            "id": "6c65d2b7",
            "text": "承久の乱",
            "isCorrect": false
          },
          {
            "id": "86e66e2c",
            "text": "壬申の乱",
            "isCorrect": false
          },
          {
            "id": "f936affb",
            "text": "応仁の乱",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "この混乱により南北朝の合一が遅れました。",
        "imageUrl": null,
        "order": 7
      },
      {
        "type": "multiple-choice",
        "text": "南北朝時代、地方で軍事・警察権に加え行政・裁判権も握った守護を？",
        "choices": [
          {
            "id": "074b2101",
            "text": "守護大名",
            "isCorrect": true
          },
          {
            "id": "5004e714",
            "text": "地頭",
            "isCorrect": false
          },
          {
            "id": "d73a7015",
            "text": "戦国大名",
            "isCorrect": false
          },
          {
            "id": "2091121d",
            "text": "管領",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "一国を支配する領主へと成長していきました。",
        "imageUrl": null,
        "order": 8
      },
      {
        "type": "multiple-choice",
        "text": "1392年、南北朝の合一を成し遂げた室町幕府三代将軍は？",
        "choices": [
          {
            "id": "c8c6f070",
            "text": "足利義満",
            "isCorrect": true
          },
          {
            "id": "17923794",
            "text": "足利義政",
            "isCorrect": false
          },
          {
            "id": "4ed6d969",
            "text": "足利尊氏",
            "isCorrect": false
          },
          {
            "id": "3bf6ceff",
            "text": "足利義昭",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "幕府の全盛期を築きました。",
        "imageUrl": null,
        "order": 9
      }
    ]
  },
  {
    "id": "muromachi-period",
    "title": "室町時代",
    "description": "足利義満、勘合貿易、応仁の乱、北山・東山文化を網羅した20問。",
    "category": "社会",
    "subcategory": "歴史",
    "questions": [
      {
        "type": "multiple-choice",
        "text": "室町幕府三代将軍で、南北朝合一や金閣の建立を行ったのは？",
        "choices": [
          {
            "id": "1b97636c",
            "text": "足利義満",
            "isCorrect": true
          },
          {
            "id": "465da825",
            "text": "足利義政",
            "isCorrect": false
          },
          {
            "id": "7b07597c",
            "text": "足利尊氏",
            "isCorrect": false
          },
          {
            "id": "161f8fdc",
            "text": "足利義昭",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "公家と武家の両方の権力を掌握しました。",
        "imageUrl": null,
        "order": 0
      },
      {
        "type": "multiple-choice",
        "text": "足利義満が明（中国）と行った、証明書を用いる貿易を何という？",
        "choices": [
          {
            "id": "aa8d7106",
            "text": "勘合貿易（日明貿易）",
            "isCorrect": true
          },
          {
            "id": "08bceef2",
            "text": "日宋貿易",
            "isCorrect": false
          },
          {
            "id": "3f0eb0b6",
            "text": "南蛮貿易",
            "isCorrect": false
          },
          {
            "id": "395f9a93",
            "text": "朱印船貿易",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "倭寇と区別するために勘合符を使いました。",
        "imageUrl": null,
        "order": 1
      },
      {
        "type": "multiple-choice",
        "text": "室町幕府で将軍を補佐し、政治の実務を担った最高職は？",
        "choices": [
          {
            "id": "9956090f",
            "text": "管領（かんれい）",
            "isCorrect": true
          },
          {
            "id": "94d32ac0",
            "text": "執権",
            "isCorrect": false
          },
          {
            "id": "d2202558",
            "text": "老中",
            "isCorrect": false
          },
          {
            "id": "34cf734c",
            "text": "大老",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "細川・斯波・畠山の三家が交代で務めました（三管領）。",
        "imageUrl": null,
        "order": 2
      },
      {
        "type": "multiple-choice",
        "text": "1467年、将軍の世継ぎ争いから始まり、11年間続いた大乱は？",
        "choices": [
          {
            "id": "e48bea25",
            "text": "応仁の乱",
            "isCorrect": true
          },
          {
            "id": "400f6d6d",
            "text": "承久の乱",
            "isCorrect": false
          },
          {
            "id": "637e90c5",
            "text": "保元の乱",
            "isCorrect": false
          },
          {
            "id": "38c2c847",
            "text": "壬申の乱",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "戦国時代へと突入するきっかけとなりました。",
        "imageUrl": null,
        "order": 3
      },
      {
        "type": "multiple-choice",
        "text": "応仁の乱の時の八代将軍で、銀閣を建てた人物は？",
        "choices": [
          {
            "id": "19bd264b",
            "text": "足利義政",
            "isCorrect": true
          },
          {
            "id": "a3143b4c",
            "text": "足利義満",
            "isCorrect": false
          },
          {
            "id": "bd058747",
            "text": "足利義教",
            "isCorrect": false
          },
          {
            "id": "cd4a4db1",
            "text": "足利義昭",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "政治よりも文化に関心を持ちました。",
        "imageUrl": null,
        "order": 4
      },
      {
        "type": "multiple-choice",
        "text": "足利義満の時代、華やかな貴族文化と武士の文化が融合した文化を？",
        "choices": [
          {
            "id": "b4749a90",
            "text": "北山文化",
            "isCorrect": true
          },
          {
            "id": "5d1d6291",
            "text": "東山文化",
            "isCorrect": false
          },
          {
            "id": "c394fd1e",
            "text": "元禄文化",
            "isCorrect": false
          },
          {
            "id": "6b6d7109",
            "text": "天平文化",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "金閣（鹿苑寺）が代表的です。",
        "imageUrl": null,
        "order": 5
      },
      {
        "type": "multiple-choice",
        "text": "足利義政の時代、わび・さびを重んじる質素で深い味わいの文化を？",
        "choices": [
          {
            "id": "57cef53e",
            "text": "東山文化",
            "isCorrect": true
          },
          {
            "id": "bd883ec3",
            "text": "北山文化",
            "isCorrect": false
          },
          {
            "id": "561b45f6",
            "text": "桃山文化",
            "isCorrect": false
          },
          {
            "id": "e58ced0f",
            "text": "国風文化",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "銀閣（慈照寺）や書院造が代表的です。",
        "imageUrl": null,
        "order": 6
      },
      {
        "type": "multiple-choice",
        "text": "東山文化で確立された、現代の和室の原型となる建築様式は？",
        "choices": [
          {
            "id": "86444051",
            "text": "書院造",
            "isCorrect": true
          },
          {
            "id": "db5c5aa3",
            "text": "寝殿造",
            "isCorrect": false
          },
          {
            "id": "050040dd",
            "text": "武家造",
            "isCorrect": false
          },
          {
            "id": "baea387c",
            "text": "校倉造",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "畳、障子、床の間などが特徴です。",
        "imageUrl": null,
        "order": 7
      },
      {
        "type": "multiple-choice",
        "text": "観阿弥・世阿弥親子が大成させた、仮面を用いる舞台芸術は？",
        "choices": [
          {
            "id": "7f185a63",
            "text": "能（猿楽の能）",
            "isCorrect": true
          },
          {
            "id": "2ec6a7c4",
            "text": "歌舞伎",
            "isCorrect": false
          },
          {
            "id": "e5be7cd0",
            "text": "人形浄瑠璃",
            "isCorrect": false
          },
          {
            "id": "ed51dee0",
            "text": "落語",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "幕府の保護を受けて発展しました。",
        "imageUrl": null,
        "order": 8
      },
      {
        "type": "multiple-choice",
        "text": "室町時代、農民たちが結成した自治組織を何という？",
        "choices": [
          {
            "id": "098b7f29",
            "text": "惣（そう）",
            "isCorrect": true
          },
          {
            "id": "50572fa0",
            "text": "五人組",
            "isCorrect": false
          },
          {
            "id": "269eb08d",
            "text": "座",
            "isCorrect": false
          },
          {
            "id": "074dbab7",
            "text": "株仲間",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "村の掟を定め、団結して領主に抵抗することもありました。",
        "imageUrl": null,
        "order": 9
      }
    ]
  },
  {
    "id": "sengoku-period",
    "title": "戦国時代",
    "description": "下剋上、戦国大名、鉄砲・キリスト教の伝来を網羅した20問。",
    "category": "社会",
    "subcategory": "歴史",
    "questions": [
      {
        "type": "multiple-choice",
        "text": "下の者が上の者を実力で倒す、戦国時代の社会風潮を何という？",
        "choices": [
          {
            "id": "d6ddbb2a",
            "text": "下剋上",
            "isCorrect": true
          },
          {
            "id": "ebfa0a54",
            "text": "封建制",
            "isCorrect": false
          },
          {
            "id": "092e6957",
            "text": "実力主義",
            "isCorrect": false
          },
          {
            "id": "bc03734e",
            "text": "御恩と奉公",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "身分に関わらず実力者がのし上がりました。",
        "imageUrl": null,
        "order": 0
      },
      {
        "type": "multiple-choice",
        "text": "各地で独自の領国支配を行った有力な武士を何という？",
        "choices": [
          {
            "id": "76511088",
            "text": "戦国大名",
            "isCorrect": true
          },
          {
            "id": "836e35a8",
            "text": "守護大名",
            "isCorrect": false
          },
          {
            "id": "5b636e22",
            "text": "地頭",
            "isCorrect": false
          },
          {
            "id": "443de0cd",
            "text": "御家人",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "富国強兵に努め、天下を狙いました。",
        "imageUrl": null,
        "order": 1
      },
      {
        "type": "multiple-choice",
        "text": "戦国大名が領地を治めるために独自に定めた法律を何という？",
        "choices": [
          {
            "id": "ac91dcaa",
            "text": "分国法",
            "isCorrect": true
          },
          {
            "id": "3ce21940",
            "text": "御成敗式目",
            "isCorrect": false
          },
          {
            "id": "590bf205",
            "text": "武家諸法度",
            "isCorrect": false
          },
          {
            "id": "41478721",
            "text": "公事方御定書",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "「喧嘩両成敗」などの厳しい決まりがありました。",
        "imageUrl": null,
        "order": 2
      },
      {
        "type": "multiple-choice",
        "text": "1543年、種子島に漂着したポルトガル人によって伝えられた武器は？",
        "choices": [
          {
            "id": "db4bc9a7",
            "text": "鉄砲（火縄銃）",
            "isCorrect": true
          },
          {
            "id": "8da88e67",
            "text": "大砲",
            "isCorrect": false
          },
          {
            "id": "1e802be4",
            "text": "日本刀",
            "isCorrect": false
          },
          {
            "id": "84b03849",
            "text": "弓矢",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "戦い方を大きく変えることになりました。",
        "imageUrl": null,
        "order": 3
      },
      {
        "type": "multiple-choice",
        "text": "1549年、鹿児島に来航し、キリスト教を伝えた宣教師は？",
        "choices": [
          {
            "id": "b2dcc93f",
            "text": "フランシスコ・ザビエル",
            "isCorrect": true
          },
          {
            "id": "7c13c104",
            "text": "ルイス・フロイス",
            "isCorrect": false
          },
          {
            "id": "740bc950",
            "text": "ペリー",
            "isCorrect": false
          },
          {
            "id": "d8bcaa96",
            "text": "マルコ・ポーロ",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "イエズス会の創設メンバーの一人です。",
        "imageUrl": null,
        "order": 4
      },
      {
        "type": "multiple-choice",
        "text": "キリスト教を保護し、自らも信者となった戦国大名を何という？",
        "choices": [
          {
            "id": "2180abd0",
            "text": "キリシタン大名",
            "isCorrect": true
          },
          {
            "id": "991afe42",
            "text": "南蛮大名",
            "isCorrect": false
          },
          {
            "id": "98926472",
            "text": "貿易大名",
            "isCorrect": false
          },
          {
            "id": "86773019",
            "text": "守護大名",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "大友宗麟や高山右近などが有名です。",
        "imageUrl": null,
        "order": 5
      },
      {
        "type": "multiple-choice",
        "text": "戦国時代、日本とスペイン・ポルトガルの間で行われた貿易を？",
        "choices": [
          {
            "id": "86ffcd95",
            "text": "南蛮貿易",
            "isCorrect": true
          },
          {
            "id": "f799339c",
            "text": "勘合貿易",
            "isCorrect": false
          },
          {
            "id": "dbb64c91",
            "text": "日宋貿易",
            "isCorrect": false
          },
          {
            "id": "8950a300",
            "text": "朱印船貿易",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "生糸や硝石（火薬の原料）などが輸入されました。",
        "imageUrl": null,
        "order": 6
      },
      {
        "type": "multiple-choice",
        "text": "「越後の虎」と呼ばれ、武田信玄と川中島で戦った大名は？",
        "choices": [
          {
            "id": "81270b67",
            "text": "上杉謙信",
            "isCorrect": true
          },
          {
            "id": "cec95d76",
            "text": "織田信長",
            "isCorrect": false
          },
          {
            "id": "a923a424",
            "text": "徳川家康",
            "isCorrect": false
          },
          {
            "id": "cac647d8",
            "text": "伊達政宗",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "義理に厚い名将として知られます。",
        "imageUrl": null,
        "order": 7
      },
      {
        "type": "multiple-choice",
        "text": "「甲斐の虎」と呼ばれ、強力な騎馬軍団を率いた大名は？",
        "choices": [
          {
            "id": "93c46982",
            "text": "武田信玄",
            "isCorrect": true
          },
          {
            "id": "bf059545",
            "text": "北条氏康",
            "isCorrect": false
          },
          {
            "id": "0bad2d57",
            "text": "毛利元就",
            "isCorrect": false
          },
          {
            "id": "5f447685",
            "text": "島津義弘",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "「人は城、人は石垣...」の言葉が有名です。",
        "imageUrl": null,
        "order": 8
      },
      {
        "type": "multiple-choice",
        "text": "中国地方の小規模な国人から、一代で中国全土を制した知将は？",
        "choices": [
          {
            "id": "e76f238f",
            "text": "毛利元就",
            "isCorrect": true
          },
          {
            "id": "d2698bf4",
            "text": "尼子経久",
            "isCorrect": false
          },
          {
            "id": "20f6ae75",
            "text": "宇喜多直家",
            "isCorrect": false
          },
          {
            "id": "2402a33b",
            "text": "陶晴賢",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "「三本の矢」の教えが有名です。",
        "imageUrl": null,
        "order": 9
      }
    ]
  },
  {
    "id": "azuchi-momoyama-period",
    "title": "安土桃山時代",
    "description": "織田信長、豊臣秀吉、天下統一、桃山文化を網羅した20問。",
    "category": "社会",
    "subcategory": "歴史",
    "questions": [
      {
        "type": "multiple-choice",
        "text": "本能寺の変の後、山崎の戦いで明智光秀を破った信長の家臣は？",
        "choices": [
          {
            "id": "ef4e9bdb",
            "text": "豊臣秀吉（羽柴秀吉）",
            "isCorrect": true
          },
          {
            "id": "54c4dc40",
            "text": "徳川家康",
            "isCorrect": false
          },
          {
            "id": "8d5dc594",
            "text": "柴田勝家",
            "isCorrect": false
          },
          {
            "id": "c131061d",
            "text": "前田利家",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "信長の後継者争いに勝利しました。",
        "imageUrl": null,
        "order": 0
      },
      {
        "type": "multiple-choice",
        "text": "豊臣秀吉が全国の田畑を調査し、収穫量を石高で表した政策は？",
        "choices": [
          {
            "id": "51eccecc",
            "text": "太閤検地",
            "isCorrect": true
          },
          {
            "id": "e254f6cb",
            "text": "刀狩",
            "isCorrect": false
          },
          {
            "id": "b7b3d533",
            "text": "地租改正",
            "isCorrect": false
          },
          {
            "id": "352810b9",
            "text": "農地改革",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "全国の土地を統一した基準で把握しました。",
        "imageUrl": null,
        "order": 1
      },
      {
        "type": "multiple-choice",
        "text": "豊臣秀吉が農民から武器を取り上げ、一揆を防いだ政策は？",
        "choices": [
          {
            "id": "68d35fa6",
            "text": "刀狩",
            "isCorrect": true
          },
          {
            "id": "29efbcc1",
            "text": "太閤検地",
            "isCorrect": false
          },
          {
            "id": "3da22932",
            "text": "身分統制令",
            "isCorrect": false
          },
          {
            "id": "c855cc5a",
            "text": "兵農分離",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "「大仏建立のため」という名目で行われました。",
        "imageUrl": null,
        "order": 2
      },
      {
        "type": "multiple-choice",
        "text": "太閤検地と刀狩により、武士と農民の身分を明確に分けたことを？",
        "choices": [
          {
            "id": "d065043c",
            "text": "兵農分離",
            "isCorrect": true
          },
          {
            "id": "171af17e",
            "text": "士農工商",
            "isCorrect": false
          },
          {
            "id": "f78ca87d",
            "text": "封建制",
            "isCorrect": false
          },
          {
            "id": "96f12d77",
            "text": "下剋上",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "近世社会の基礎となりました。",
        "imageUrl": null,
        "order": 3
      },
      {
        "type": "multiple-choice",
        "text": "豊臣秀吉が関白となり、四国・九州・関東を平定して天下統一したのは何年？",
        "choices": [
          {
            "id": "b29407ef",
            "text": "1590年",
            "isCorrect": true
          },
          {
            "id": "f3cab14d",
            "text": "1582年",
            "isCorrect": false
          },
          {
            "id": "b6ae2844",
            "text": "1600年",
            "isCorrect": false
          },
          {
            "id": "8d022413",
            "text": "1603年",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "北条氏を滅ぼし、全国統一を果たしました。",
        "imageUrl": null,
        "order": 4
      },
      {
        "type": "multiple-choice",
        "text": "豊臣秀吉がキリスト教の広まりを警戒して出した令は？",
        "choices": [
          {
            "id": "28a1f5dd",
            "text": "バテレン追放令",
            "isCorrect": true
          },
          {
            "id": "0b81e9e6",
            "text": "禁教令",
            "isCorrect": false
          },
          {
            "id": "5b96f55d",
            "text": "鎖国令",
            "isCorrect": false
          },
          {
            "id": "cdab6f18",
            "text": "踏絵令",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "宣教師の追放を命じましたが、貿易は継続しました。",
        "imageUrl": null,
        "order": 5
      },
      {
        "type": "multiple-choice",
        "text": "豊臣秀吉が2度にわたり朝鮮半島へ大軍を送った出来事は？",
        "choices": [
          {
            "id": "f927bebd",
            "text": "朝鮮出兵（文禄・慶長の役）",
            "isCorrect": true
          },
          {
            "id": "468b913a",
            "text": "元寇",
            "isCorrect": false
          },
          {
            "id": "290c6f7c",
            "text": "白村江の戦い",
            "isCorrect": false
          },
          {
            "id": "143855be",
            "text": "日清戦争",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "秀吉の死により撤退しましたが、大きな被害を残しました。",
        "imageUrl": null,
        "order": 6
      },
      {
        "type": "multiple-choice",
        "text": "安土桃山時代、大名や豪商の富を背景に栄えた豪華な文化を？",
        "choices": [
          {
            "id": "f4b6bd84",
            "text": "桃山文化",
            "isCorrect": true
          },
          {
            "id": "5667ce20",
            "text": "元禄文化",
            "isCorrect": false
          },
          {
            "id": "e9cc70d3",
            "text": "東山文化",
            "isCorrect": false
          },
          {
            "id": "3376f527",
            "text": "北山文化",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "城郭建築や金屏風などが特徴です。",
        "imageUrl": null,
        "order": 7
      },
      {
        "type": "multiple-choice",
        "text": "桃山文化を代表する、壮大な城郭建築の例は？",
        "choices": [
          {
            "id": "a362ae91",
            "text": "姫路城（白鷺城）",
            "isCorrect": true
          },
          {
            "id": "70faa6c6",
            "text": "江戸城",
            "isCorrect": false
          },
          {
            "id": "131bec85",
            "text": "平城京",
            "isCorrect": false
          },
          {
            "id": "c05bba09",
            "text": "金閣",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "天守閣を持つ平山城が普及しました。",
        "imageUrl": null,
        "order": 8
      },
      {
        "type": "multiple-choice",
        "text": "狩野派の絵師で、安土城や大坂城の障壁画を描いたのは？",
        "choices": [
          {
            "id": "2c882912",
            "text": "狩野永徳",
            "isCorrect": true
          },
          {
            "id": "037a5317",
            "text": "雪舟",
            "isCorrect": false
          },
          {
            "id": "2575c8b4",
            "text": "尾形光琳",
            "isCorrect": false
          },
          {
            "id": "d2379ad1",
            "text": "葛飾北斎",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "「唐獅子図屏風」などが有名です。",
        "imageUrl": null,
        "order": 9
      }
    ]
  },
  {
    "id": "edo-period",
    "title": "江戸時代",
    "description": "江戸幕府の成立から三大改革、鎖国まで、江戸時代の基礎を学ぶ10問。",
    "category": "社会",
    "subcategory": "歴史",
    "questions": [
      {
        "type": "multiple-choice",
        "text": "徳川家康が征夷大将軍に任命され、江戸幕府を開いたのは西暦何年？",
        "choices": [
          {
            "id": "1",
            "text": "1600年",
            "isCorrect": false
          },
          {
            "id": "2",
            "text": "1603年",
            "isCorrect": true
          },
          {
            "id": "3",
            "text": "1615年",
            "isCorrect": false
          },
          {
            "id": "4",
            "text": "1590年",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "1600年の関ヶ原の戦いの後、1603年に江戸幕府が開かれました。",
        "imageUrl": null,
        "order": 0
      },
      {
        "type": "multiple-choice",
        "text": "幕府が大名を統制するために制定した、城の修理の制限などを定めた法律は？",
        "choices": [
          {
            "id": "5",
            "text": "御成敗式目",
            "isCorrect": false
          },
          {
            "id": "6",
            "text": "武家諸法度",
            "isCorrect": true
          },
          {
            "id": "7",
            "text": "公事方御定書",
            "isCorrect": false
          },
          {
            "id": "8",
            "text": "禁中並公家諸法度",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "武家諸法度は大名を厳しく統制するための法律です。",
        "imageUrl": null,
        "order": 1
      },
      {
        "type": "multiple-choice",
        "text": "3代将軍家光が制度化した、大名が1年おきに江戸と領地を往復する制度は？",
        "choices": [
          {
            "id": "9",
            "text": "参勤交代",
            "isCorrect": true
          },
          {
            "id": "10",
            "text": "検地",
            "isCorrect": false
          },
          {
            "id": "11",
            "text": "刀狩",
            "isCorrect": false
          },
          {
            "id": "12",
            "text": "朱印船貿易",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "参勤交代により大名の経済力を削ぎ、反乱を防ぎました。",
        "imageUrl": null,
        "order": 2
      },
      {
        "type": "multiple-choice",
        "text": "江戸幕府がキリスト教を禁止するために、人々にキリスト像などを踏ませたことは？",
        "choices": [
          {
            "id": "13",
            "text": "宗門改",
            "isCorrect": false
          },
          {
            "id": "14",
            "text": "絵踏",
            "isCorrect": true
          },
          {
            "id": "15",
            "text": "寺請制度",
            "isCorrect": false
          },
          {
            "id": "16",
            "text": "踏み絵",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "踏ませる行為自体を「絵踏」、その板を「踏み絵」と呼びます。",
        "imageUrl": null,
        "order": 3
      },
      {
        "type": "multiple-choice",
        "text": "鎖国下の日本で、唯一ヨーロッパの国で貿易が許されていたのは？",
        "choices": [
          {
            "id": "17",
            "text": "イギリス",
            "isCorrect": false
          },
          {
            "id": "18",
            "text": "スペイン",
            "isCorrect": false
          },
          {
            "id": "19",
            "text": "ポルトガル",
            "isCorrect": false
          },
          {
            "id": "20",
            "text": "オランダ",
            "isCorrect": true
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "オランダは長崎の出島で貿易を行っていました。",
        "imageUrl": null,
        "order": 4
      },
      {
        "type": "multiple-choice",
        "text": "5代将軍綱吉が出した、極端な動物愛護を命じた法令は？",
        "choices": [
          {
            "id": "21",
            "text": "生類憐みの令",
            "isCorrect": true
          },
          {
            "id": "22",
            "text": "倹約令",
            "isCorrect": false
          },
          {
            "id": "23",
            "text": "棄捐令",
            "isCorrect": false
          },
          {
            "id": "24",
            "text": "人返し令",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "綱吉は「犬公方」とも呼ばれました。",
        "imageUrl": null,
        "order": 5
      },
      {
        "type": "multiple-choice",
        "text": "8代将軍吉宗が行った、幕府の財政再建を目的とした改革は？",
        "choices": [
          {
            "id": "25",
            "text": "寛政の改革",
            "isCorrect": false
          },
          {
            "id": "26",
            "text": "天保の改革",
            "isCorrect": false
          },
          {
            "id": "27",
            "text": "享保の改革",
            "isCorrect": true
          },
          {
            "id": "28",
            "text": "正徳の治",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "吉宗は目安箱の設置なども行いました。",
        "imageUrl": null,
        "order": 6
      },
      {
        "type": "multiple-choice",
        "text": "吉宗の時代に定められた、裁判の基準となる法律は？",
        "choices": [
          {
            "id": "29",
            "text": "公事方御定書",
            "isCorrect": true
          },
          {
            "id": "30",
            "text": "御成敗式目",
            "isCorrect": false
          },
          {
            "id": "31",
            "text": "武家諸法度",
            "isCorrect": false
          },
          {
            "id": "32",
            "text": "養老律令",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "合理的な裁判を行うための基準となりました。",
        "imageUrl": null,
        "order": 7
      },
      {
        "type": "multiple-choice",
        "text": "田沼意次が推奨した、商人の組合を何という？",
        "choices": [
          {
            "id": "33",
            "text": "座",
            "isCorrect": false
          },
          {
            "id": "34",
            "text": "株仲間",
            "isCorrect": true
          },
          {
            "id": "35",
            "text": "問屋制家内工業",
            "isCorrect": false
          },
          {
            "id": "36",
            "text": "ギルド",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "株仲間に独占権を与える代わりに税を徴収しました。",
        "imageUrl": null,
        "order": 8
      },
      {
        "type": "multiple-choice",
        "text": "松平定信が行った、朱子学以外の講義を禁止した改革は？",
        "choices": [
          {
            "id": "37",
            "text": "享保の改革",
            "isCorrect": false
          },
          {
            "id": "38",
            "text": "寛政の改革",
            "isCorrect": true
          },
          {
            "id": "39",
            "text": "天保の改革",
            "isCorrect": false
          },
          {
            "id": "40",
            "text": "明治維新",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "寛政異学の禁と呼ばれます。",
        "imageUrl": null,
        "order": 9
      }
    ]
  },
  {
    "id": "edo-period-review",
    "title": "江戸時代の総復習",
    "description": "江戸時代の政治、外交、文化、人物を網羅した20問のテスト。",
    "category": "社会",
    "subcategory": "歴史",
    "questions": [
      {
        "type": "multiple-choice",
        "text": "1603年、江戸幕府を開き初代将軍となった人物は？",
        "choices": [
          {
            "id": "5eb96762",
            "text": "徳川家康",
            "isCorrect": true
          },
          {
            "id": "60681c1b",
            "text": "徳川家光",
            "isCorrect": false
          },
          {
            "id": "093f6c4b",
            "text": "織田信長",
            "isCorrect": false
          },
          {
            "id": "226d3583",
            "text": "豊臣秀吉",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "関ヶ原の戦いに勝利して天下を掌握しました。",
        "imageUrl": null,
        "order": 0
      },
      {
        "type": "multiple-choice",
        "text": "三代将軍・徳川家光が定めた、大名が江戸と領地を往復する制度は？",
        "choices": [
          {
            "id": "5de5c221",
            "text": "参勤交代",
            "isCorrect": true
          },
          {
            "id": "7f497aae",
            "text": "武家諸法度",
            "isCorrect": false
          },
          {
            "id": "17f75d23",
            "text": "禁中並公家諸法度",
            "isCorrect": false
          },
          {
            "id": "3860783c",
            "text": "目安箱",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "大名の経済力を削ぐ目的がありました。",
        "imageUrl": null,
        "order": 1
      },
      {
        "type": "multiple-choice",
        "text": "江戸幕府がキリスト教を禁止するために行った、宗教調査は？",
        "choices": [
          {
            "id": "94e8740d",
            "text": "宗門改（しゅうもんあらため）",
            "isCorrect": true
          },
          {
            "id": "6e34c8bc",
            "text": "絵踏",
            "isCorrect": false
          },
          {
            "id": "660a88f7",
            "text": "檀家制度",
            "isCorrect": false
          },
          {
            "id": "ad7f627d",
            "text": "五人組",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "寺請制度とともに民衆を管理しました。",
        "imageUrl": null,
        "order": 2
      },
      {
        "type": "multiple-choice",
        "text": "幕府がオランダ・中国以外との交流を断った政策を何という？",
        "choices": [
          {
            "id": "42054176",
            "text": "鎖国",
            "isCorrect": true
          },
          {
            "id": "7465cbc7",
            "text": "海禁",
            "isCorrect": false
          },
          {
            "id": "961a1a0a",
            "text": "攘夷",
            "isCorrect": false
          },
          {
            "id": "451c3ff4",
            "text": "開国",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "長崎の出島などが窓口となりました。",
        "imageUrl": null,
        "order": 3
      },
      {
        "type": "multiple-choice",
        "text": "「享保の改革」を行い、目安箱を設置した八代将軍は？",
        "choices": [
          {
            "id": "5c44915a",
            "text": "徳川吉宗",
            "isCorrect": true
          },
          {
            "id": "11f17a65",
            "text": "徳川綱吉",
            "isCorrect": false
          },
          {
            "id": "bd6f3e21",
            "text": "徳川家斉",
            "isCorrect": false
          },
          {
            "id": "45e2b113",
            "text": "徳川慶喜",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "「米将軍」と呼ばれ財政再建に努めました。",
        "imageUrl": null,
        "order": 4
      },
      {
        "type": "multiple-choice",
        "text": "「寛政の改革」を行い、厳しい倹約を強いた老中は？",
        "choices": [
          {
            "id": "471162df",
            "text": "松平定信",
            "isCorrect": true
          },
          {
            "id": "8eb93371",
            "text": "田沼意次",
            "isCorrect": false
          },
          {
            "id": "988cbd91",
            "text": "水野忠邦",
            "isCorrect": false
          },
          {
            "id": "71bdd9db",
            "text": "井伊直弼",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "朱子学以外の講義を禁止しました。",
        "imageUrl": null,
        "order": 5
      },
      {
        "type": "multiple-choice",
        "text": "「天保の改革」を行い、株仲間の解散などを命じた老中は？",
        "choices": [
          {
            "id": "925f4693",
            "text": "水野忠邦",
            "isCorrect": true
          },
          {
            "id": "eb1f1aa3",
            "text": "松平定信",
            "isCorrect": false
          },
          {
            "id": "2dab8664",
            "text": "田沼意次",
            "isCorrect": false
          },
          {
            "id": "1228e9cb",
            "text": "阿部正弘",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "改革は短期間で失敗しました。",
        "imageUrl": null,
        "order": 6
      },
      {
        "type": "multiple-choice",
        "text": "1853年、浦賀に黒船で来航し開国を求めたアメリカ人は？",
        "choices": [
          {
            "id": "432037c5",
            "text": "ペリー",
            "isCorrect": true
          },
          {
            "id": "9636a1ce",
            "text": "ハリス",
            "isCorrect": false
          },
          {
            "id": "da6ca4de",
            "text": "マッカーサー",
            "isCorrect": false
          },
          {
            "id": "a3032688",
            "text": "カウベル",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "日米和親条約の締結につながりました。",
        "imageUrl": null,
        "order": 7
      },
      {
        "type": "multiple-choice",
        "text": "江戸時代中期、上方を中心に栄えた町人文化は？",
        "choices": [
          {
            "id": "70ebfce4",
            "text": "元禄文化",
            "isCorrect": true
          },
          {
            "id": "8f2447db",
            "text": "化政文化",
            "isCorrect": false
          },
          {
            "id": "4b2f1f1a",
            "text": "桃山文化",
            "isCorrect": false
          },
          {
            "id": "1090acea",
            "text": "東山文化",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "松尾芭蕉や近松門左衛門らが活躍しました。",
        "imageUrl": null,
        "order": 8
      },
      {
        "type": "multiple-choice",
        "text": "江戸時代後期、江戸を中心に栄えた皮肉や滑稽な文化は？",
        "choices": [
          {
            "id": "48bdbf7b",
            "text": "化政文化",
            "isCorrect": true
          },
          {
            "id": "b2f5c35a",
            "text": "元禄文化",
            "isCorrect": false
          },
          {
            "id": "f41a3819",
            "text": "国風文化",
            "isCorrect": false
          },
          {
            "id": "4f894485",
            "text": "天平文化",
            "isCorrect": false
          }
        ],
        "timeLimit": 20,
        "points": 1000,
        "explanation": "葛飾北斎や歌川広重の浮世絵が有名です。",
        "imageUrl": null,
        "order": 9
      }
    ]
  }
];