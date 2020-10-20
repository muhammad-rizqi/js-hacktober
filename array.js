const surah = 
{
    "msg": "All Surat Data",
    "data": [
      {
        "id": 1,
        "surat_name": "Al-Fatihah",
        "surat_text": " الفاتحة",
        "surat_terjemahan": "Pembukaan",
        "count_ayat": 7
      },
      {
        "id": 2,
        "surat_name": "Al-Baqarah",
        "surat_text": " البقرة",
        "surat_terjemahan": "Sapi",
        "count_ayat": 286
      },
      {
        "id": 3,
        "surat_name": "Ali 'Imran",
        "surat_text": " اٰل عمران",
        "surat_terjemahan": "Keluarga Imran",
        "count_ayat": 200
      },
      {
        "id": 4,
        "surat_name": "An-Nisa'",
        "surat_text": " النساۤء",
        "surat_terjemahan": "Wanita",
        "count_ayat": 176
      },
      {
        "id": 5,
        "surat_name": "Al-Ma'idah",
        "surat_text": " الماۤئدة",
        "surat_terjemahan": "Hidangan",
        "count_ayat": 120
      },
      {
        "id": 6,
        "surat_name": "Al-An'am",
        "surat_text": " الانعام",
        "surat_terjemahan": "Binatang Ternak",
        "count_ayat": 165
      },
      {
        "id": 7,
        "surat_name": "Al-A'raf",
        "surat_text": " الاعراف",
        "surat_terjemahan": "Tempat Tertinggi",
        "count_ayat": 206
      },
      {
        "id": 8,
        "surat_name": "Al-Anfal",
        "surat_text": " الانفال",
        "surat_terjemahan": "Rampasan Perang",
        "count_ayat": 75
      },
      {
        "id": 9,
        "surat_name": "At-Taubah",
        "surat_text": " التوبة",
        "surat_terjemahan": "Pengampunan",
        "count_ayat": 129
      },
      {
        "id": 10,
        "surat_name": "Yunus",
        "surat_text": " يونس",
        "surat_terjemahan": "Yunus",
        "count_ayat": 109
      }
    ]
  }

const tampilan = surah.data

tampilan.map(
    (surat) =>{
        document.write('<br>');
        document.write('<h1>'+surat.surat_text +'</h1>');
        document.write('<li>'+surat.surat_name+'</li>'+'<br/>');
        document.write(surat.surat_terjemahan);
        document.write('<hr>');

    }
)