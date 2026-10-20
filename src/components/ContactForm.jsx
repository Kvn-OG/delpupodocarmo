import { useId, useRef, useState } from 'react'
import { CircleAlert, CircleCheck } from 'lucide-react'
import Button from './Button'
import { WhatsAppIcon } from './icons'
import { whatsappLink } from '../lib/whatsapp'

/**
 * Formulário de atendimento.
 *
 * Sem backend configurado, o envio NÃO é simulado: após a validação, o
 * visitante é levado ao WhatsApp com a mensagem pronta e decide se envia.
 *
 * Para receber os dados diretamente (ex.: Formspree, Getform ou API própria),
 * defina VITE_FORM_ENDPOINT no .env com a URL que aceita POST em JSON.
 * Nesse caso a confirmação só aparece quando o serviço responde com sucesso.
 */
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT

const goals = [
  { value: 'comprar', label: 'Comprar' },
  { value: 'vender', label: 'Vender' },
  { value: 'alugar', label: 'Alugar' },
  { value: 'investir', label: 'Investir' },
  { value: 'financiamento', label: 'Conhecer opções de financiamento' },
]

const initial = { name: '', phone: '', goal: '', message: '', consent: false }

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits.length ? `(${digits}` : ''
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function validate(values) {
  const errors = {}
  if (values.name.trim().split(/\s+/).filter(Boolean).length < 2)
    errors.name = 'Informe seu nome completo (nome e sobrenome).'
  const digits = values.phone.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 11) errors.phone = 'Informe um telefone ou WhatsApp válido com DDD.'
  if (!values.goal) errors.goal = 'Selecione o seu objetivo.'
  if (values.message.length > 1000) errors.message = 'A mensagem pode ter até 1.000 caracteres.'
  if (!values.consent) errors.consent = 'Para continuar, é preciso concordar com o uso dos dados para este atendimento.'
  return errors
}

function buildWhatsAppMessage(values) {
  const goal = goals.find((g) => g.value === values.goal)?.label ?? values.goal
  const lines = [
    'Olá! Vim pelo site da Imobiliária Delpupo do Carmo e gostaria de receber atendimento.',
    '',
    `Nome: ${values.name.trim()}`,
    `Telefone: ${values.phone}`,
    `Objetivo: ${goal}`,
  ]
  if (values.message.trim()) lines.push(`Mensagem: ${values.message.trim()}`)
  return lines.join('\n')
}

function FieldError({ id, message }) {
  if (!message) return null
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm text-red-800">
      <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      {message}
    </p>
  )
}

export default function ContactForm() {
  const uid = useId()
  const formRef = useRef(null)
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState({ type: 'idle' })

  const fieldId = (name) => `${uid}-${name}`
  const update = (name, value) => {
    const next = { ...values, [name]: name === 'phone' ? formatPhone(value) : value }
    setValues(next)
    if (touched[name]) setErrors(validate(next))
  }
  const blur = (name) => {
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors(validate(values))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    setTouched({ name: true, phone: true, goal: true, message: true, consent: true })

    if (Object.keys(found).length) {
      const first = Object.keys(found)[0]
      formRef.current?.querySelector(`[data-field="${first}"]`)?.focus()
      return
    }

    const waUrl = whatsappLink(buildWhatsAppMessage(values))

    if (!FORM_ENDPOINT) {
      window.open(waUrl, '_blank', 'noopener,noreferrer')
      setStatus({ type: 'whatsapp', url: waUrl })
      return
    }

    setStatus({ type: 'sending' })
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, origem: 'site' }),
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      setStatus({ type: 'sent' })
      setValues(initial)
      setTouched({})
    } catch {
      setStatus({ type: 'error', url: waUrl })
    }
  }

  const describedBy = (name, hint) => [hint && `${fieldId(name)}-hint`, errors[name] && touched[name] && `${fieldId(name)}-error`].filter(Boolean).join(' ') || undefined
  const showError = (name) => touched[name] && errors[name]

  const inputClass = (name) =>
    `mt-2 block w-full rounded-xl border bg-white px-4 py-3.5 text-base text-royal placeholder:text-royal/40 transition-[border-color,box-shadow] duration-300 focus:border-royal focus:ring-2 focus:ring-gold/50 focus:outline-none ${
      showError(name) ? 'border-red-700' : 'border-royal/20'
    }`

  const errorFor = (name) => <FieldError id={`${fieldId(name)}-error`} message={showError(name)} />
  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="surface-light space-y-6" aria-describedby={`${uid}-intro`}>
      <p id={`${uid}-intro`} className="text-royal/75">
        Quer receber ajuda para encontrar seu próximo imóvel? Deixe seus dados e conte um pouco sobre o que procura.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId('name')} className="text-sm font-medium text-royal">
            Nome completo <span aria-hidden="true" className="text-brown">*</span>
          </label>
          <input
            id={fieldId('name')}
            data-field="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            onBlur={() => blur('name')}
            aria-invalid={Boolean(showError('name'))}
            aria-describedby={describedBy('name')}
            className={inputClass('name')}
          />
          {errorFor('name')}
        </div>

        <div>
          <label htmlFor={fieldId('phone')} className="text-sm font-medium text-royal">
            Telefone ou WhatsApp <span aria-hidden="true" className="text-brown">*</span>
          </label>
          <input
            id={fieldId('phone')}
            data-field="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="(27) 90000-0000"
            required
            value={values.phone}
            onChange={(e) => update('phone', e.target.value)}
            onBlur={() => blur('phone')}
            aria-invalid={Boolean(showError('phone'))}
            aria-describedby={describedBy('phone')}
            className={inputClass('phone')}
          />
          {errorFor('phone')}
        </div>
      </div>

      <fieldset aria-describedby={describedBy('goal')}>
        <legend className="text-sm font-medium text-royal">
          Qual é o seu objetivo? <span aria-hidden="true" className="text-brown">*</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {goals.map((goal, index) => (
            <label key={goal.value} className="cursor-pointer">
              <input
                type="radio"
                name="goal"
                value={goal.value}
                data-field={index === 0 ? 'goal' : undefined}
                checked={values.goal === goal.value}
                onChange={(e) => update('goal', e.target.value)}
                onBlur={() => touched.goal && blur('goal')}
                className="peer sr-only"
              />
              <span className="inline-flex min-h-11 items-center rounded-full border border-royal/20 bg-white px-4 py-2 text-[0.92rem] text-royal/85 transition-colors duration-300 peer-checked:border-royal peer-checked:bg-royal peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-brown peer-focus-visible:ring-offset-2 hover:border-royal/50">
                {goal.label}
              </span>
            </label>
          ))}
        </div>
        {errorFor('goal')}
      </fieldset>

      <div>
        <label htmlFor={fieldId('message')} className="text-sm font-medium text-royal">
          Mensagem <span className="font-normal text-royal/60">(opcional)</span>
        </label>
        <textarea
          id={fieldId('message')}
          data-field="message"
          name="message"
          rows={4}
          maxLength={1000}
          placeholder="Ex.: procuro um apartamento de 2 quartos em Cariacica."
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
          onBlur={() => blur('message')}
          aria-invalid={Boolean(showError('message'))}
          aria-describedby={describedBy('message')}
          className={`${inputClass('message')} resize-y`}
          data-lenis-prevent
        />
        {errorFor('message')}
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={fieldId('consent')}
            data-field="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => update('consent', e.target.checked)}
            onBlur={() => blur('consent')}
            aria-invalid={Boolean(showError('consent'))}
            aria-describedby={describedBy('consent')}
            className="mt-1 size-5 shrink-0 cursor-pointer accent-royal"
          />
          <label htmlFor={fieldId('consent')} className="cursor-pointer text-sm leading-relaxed text-royal/80">
            Concordo que a Imobiliária Delpupo do Carmo utilize meus dados para entrar em contato sobre este
            atendimento, conforme a{' '}
            <a href="/politica-de-privacidade/" className="font-medium text-royal underline underline-offset-4 hover:text-brown">
              Política de Privacidade
            </a>
            .
          </label>
        </div>
        {errorFor('consent')}
      </div>

      <div className="flex flex-col gap-4 border-t border-royal/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-xs leading-relaxed text-royal/65">
          {FORM_ENDPOINT
            ? 'Seus dados serão enviados à nossa equipe somente para este atendimento.'
            : 'Ao continuar, abriremos o WhatsApp com a sua mensagem pronta. Nada é enviado até você confirmar por lá.'}
        </p>
        <Button
          type="submit"
          variant="dark"
          icon={FORM_ENDPOINT ? undefined : WhatsAppIcon}
          disabled={status.type === 'sending'}
          className="shrink-0 disabled:opacity-60"
        >
          {status.type === 'sending' ? 'Enviando…' : 'Quero receber atendimento'}
        </Button>
      </div>

      <div aria-live="polite" role="status">
        {status.type === 'whatsapp' && (
          <p className="flex gap-3 rounded-xl border border-royal/15 bg-white p-4 text-sm text-royal">
            <CircleCheck className="mt-0.5 size-5 shrink-0 text-brown" aria-hidden="true" />
            <span>
              Abrimos o WhatsApp com a sua mensagem pronta. Para concluir o contato, é só enviá-la por lá. Se a conversa
              não abriu,{' '}
              <a href={status.url} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4">
                clique aqui para abrir o WhatsApp
              </a>
              .
            </span>
          </p>
        )}
        {status.type === 'sent' && (
          <p className="flex gap-3 rounded-xl border border-royal/15 bg-white p-4 text-sm text-royal">
            <CircleCheck className="mt-0.5 size-5 shrink-0 text-brown" aria-hidden="true" />
            Recebemos seus dados! Em breve uma de nossas corretoras entrará em contato.
          </p>
        )}
        {status.type === 'error' && (
          <p className="flex gap-3 rounded-xl border border-red-800/30 bg-red-50 p-4 text-sm text-red-900">
            <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            <span>
              Não foi possível enviar agora. Você pode{' '}
              <a href={status.url} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4">
                falar com a gente pelo WhatsApp
              </a>{' '}
              com a mensagem já preenchida.
            </span>
          </p>
        )}
      </div>
    </form>
  )
}
