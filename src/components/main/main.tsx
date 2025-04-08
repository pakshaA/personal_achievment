'use client'

import Style from './main.module.scss'
import { Plus } from 'lucide-react'
import { ButtonCustom } from '@/components/button/button'
import { Card } from '@/components/card/card'
import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Button, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'
import Cookies from 'js-cookie'

dayjs.locale('ru')

interface CardData {
  id: string
  date: string
  text: string
}

export const Main = () => {
  const [cards, setCards] = useState<CardData[]>([])
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs())
  const [text, setText] = useState('')

  useEffect(() => {
    const savedCards = Cookies.get('cards')
    if (savedCards) {
      try {
        setCards(JSON.parse(savedCards))
      } catch (error) {
        console.error('Ошибка парсинга карточек:', error)
      }
    }
  }, [])

  useEffect(() => {
      Cookies.set('cards', JSON.stringify(cards), { expires: 365 });
  }, [cards]);
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    if (selectedDate && text.trim()) {
      const newCard: CardData = {
        id: Date.now().toString(),
        date: selectedDate.format('DD.MM.YYYY'),
        text: text.trim(),
      }
      setCards((prev) => [...prev, newCard])
      Cookies.set('cards', JSON.stringify(cards), { expires: 365 })
      setOpen(false)
      setText('')
      setSelectedDate(dayjs())
    }
  }
  
  return (
    <div className={Style.wrapper}>
      <div className={Style.header}>
        <h1>Архив личных достижений</h1>
        <ButtonCustom onClick={() => setOpen(true)}>
          <Plus size={20} />
        </ButtonCustom>
      </div>

      <div className={Style.main}>
        {cards.map((c) => (
          <Card 
            key={c.id} 
            id={c.id} 
            date={c.date}
            text={c.text} 
          />
        ))}
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <form onSubmit={handleSubmit}>
            <DialogTitle>Добавить достижение</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Введите информацию о вашем достижении
              </DialogContentText>

              <DatePicker
                label="Дата достижения"
                value={selectedDate}
                onChange={setSelectedDate}
                format="DD.MM.YYYY"
                sx={{ mt: 2, mb: 2, width: '100%' }}
              />

              <TextField
                autoFocus
                required
                margin="dense"
                label="Описание достижения"
                fullWidth
                variant="outlined"
                value={text}
                onChange={(e) => setText(e.target.value)}
                multiline
                rows={4}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Отмена</Button>
              <Button type="submit" variant="contained" color="primary">
                Сохранить
              </Button>
            </DialogActions>
          </form>
        </LocalizationProvider>
      </Dialog>
    </div>
  )
}