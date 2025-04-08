'use client'

import Style from './card.module.scss'
import { Trash2, Pencil } from 'lucide-react'
import { ButtonCustom } from '@/components/button/button'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

interface ICard {
  id: string
  date: string
  text: string
}

export const Card = ({ id, date, text }: ICard) => {
  const [open, setOpen] = useState(false)
  const [editText, setEditText] = useState(text)
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs()) 

  const handleDelete = () => {
    const saved = Cookies.get('cards')
    if (!saved) return

    if (!confirm("Вы точно хотите удалить карточку?")) return

    try {
      const parsed = JSON.parse(saved)
      const updated = parsed.filter((card: ICard) => card.id !== id)
      Cookies.set('cards', JSON.stringify(updated), { expires: 365 })
      window.location.reload()
    } catch (e) {
      console.error('Ошибка удаления карточки:', e)
    }
  }

  const handleEdit = () => {
    const saved = Cookies.get('cards')
    if (!saved) return
  
    try {
      const parsed = JSON.parse(saved)
      const updated = parsed.map((card: ICard) =>
        card.id === id
          ? {
              ...card,
              text: editText,
              date: selectedDate?.format('DD.MM.YYYY') || card.date,
            }
          : card
      )
      Cookies.set('cards', JSON.stringify(updated), { expires: 365 })
      setOpen(false)
      window.location.reload() 
    } catch (e) {
      console.error('Ошибка редактирования карточки:', e)
    }
  }
  return (
    <div className={Style.card} id={id}>
      <div className={Style.header}>
        <p>{date}</p>
        <div className={Style.buttons}>
          <ButtonCustom onClick={handleDelete}>
            <Trash2 size={20} />
          </ButtonCustom>
          <ButtonCustom onClick={() => setOpen(true)}>
            <Pencil size={20} />
          </ButtonCustom>
        </div>
      </div>
      <div>{text}</div>

      <Dialog open={open} onClose={() => setOpen(false)}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DialogTitle>Редактировать достижение</DialogTitle>
        <DialogContent>
            <DatePicker
                label="Дата достижения"
                value={selectedDate}
                onChange={setSelectedDate}
                format="DD.MM.YYYY"
                sx={{ mt: 2, mb: 2, width: '100%' }}
              />
          <TextField
            autoFocus
            margin="dense"
            label="Описание"
            fullWidth
            variant="outlined"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Отмена</Button>
          <Button variant="contained" onClick={handleEdit}>Сохранить</Button>
        </DialogActions>
        </LocalizationProvider>
      </Dialog>
    </div>
  )
}
