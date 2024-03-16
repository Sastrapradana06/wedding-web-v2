import { Input, Textarea, Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';

export default function FooterView() {
  const [listKomentar, setListKomentar] = useState([
    {
      nama: "akbar",
      komentar: "Insya Allah tahun depan akhirnya terwujud"
    },
    {
      nama: "iyok",
      komentar: "Akhirnya sahabat awak"
    },
    {
      nama: "dania",
      komentar: "Selamat menempuh hidup baru."
    },
    {
      nama: "salsa",
      komentar: "Selamat menikah! Semoga langgeng dan bahagia selamanya"
    },
    {
      nama: "puput",
      komentar: "Selamat ya."
    }
  ])
  const [isStatus, setIsStatus] = useState(false);

  const [data, setData] = useState({
    'nama': '',
    'komentar': '',
  })

  const storedData = JSON.parse(localStorage.getItem('listKomentarV2'));
  useEffect(() => {
    if (storedData) {
      setListKomentar(storedData)
    }
  }, [])

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  const resetData = () => {
    setData({
      'nama': '',
      'komentar': '',
    })
    setIsStatus(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const dataKomentar = listKomentar
    dataKomentar.unshift(data)
    setListKomentar(dataKomentar)
    localStorage.setItem('listKomentarV2', JSON.stringify(listKomentar));
    setIsStatus(true)
    setTimeout(() => (
      resetData()
    ), 3000)
  }

  return (
    <div className="w-full h-max flex flex-col items-center gap-4 mt-4 mb-4" id="footer">
      <div className="text-center flex flex-col justify-center items-center w-full h-max">
        <img src="/bunga2.png" className='w-[200px] h-[80px] object-cover' alt="" />
        <p className=' uppercase tracking-[2px] mt-2 font-medium'>thanks for everything</p>
      </div>
      <div className="w-full h-max bg-[#F6F3FE] flex flex-col gap-2 p-4">
        <form onSubmit={handleSubmit} className=''>
          <Input.Wrapper label="Nama Anda" >
            <Input placeholder="" value={data.nama} onChange={handleInput} name='nama' required />
          </Input.Wrapper>
          <Textarea
            value={data.komentar} onChange={handleInput} name='komentar'
            required
            mt="md"
            label="Tulis Ucapan Selamat"
            placeholder="Selamat ya . . ."
          />
          <div className="mt-4 flex gap-4">
            <Button
              size="sm"
              variant="gradient"
              gradient={{ from: 'cyan', to: 'grape', deg: 90 }}
              type='submit'
            >Kirim
            </Button>
            <a href="https://maps.app.goo.gl/oWLMyzLHVaCcq3g86" target='_blank'>
              <Button size="sm" variant="light" color="green" >Get Lokasi </Button>
            </a>

            {isStatus && <p className='text-[.8rem] text-red-400 font-semibold'>Komentar Berhasil Di Kirim</p>}
          </div>
        </form>
        <div className="w-full h-max bg-[#bd82ee65] p-2">
          {listKomentar ? (
            <Marquee pauseOnHover gradient={false} speed={100}>
              {listKomentar.map((item, i) => {
                return (
                  <div className="w-max min-h-[50px] max-h-max justify-center p-2 rounded-md border flex flex-col bg-[#e4e3e3] text-black ml-4" key={i}>
                    <p className="text-teal-600 text-[1rem] capitalize font-semibold">{item.nama}</p>
                    <p className="text-[.7rem]">{item.komentar}</p>
                  </div>
                )
              })}
            </Marquee>
          ) : null}

        </div>
      </div>
    </div>
  )
}