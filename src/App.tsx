import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Scissors, Lightning, CheckCircle, WarningCircle } from '@phosphor-icons/react'

function App() {
  const [url, setUrl] = useState('')
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [strippedUrl, setStrippedUrl] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const validateAndStripUrl = (urlString: string): { isValid: boolean; stripped: string; hasQuery: boolean } => {
    if (!urlString.trim()) {
      return { isValid: false, stripped: '', hasQuery: false }
    }

    try {
      const urlObj = new URL(urlString)
      const hasQuery = urlObj.search !== ''
      const stripped = `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}${urlObj.hash}`
      return { isValid: true, stripped, hasQuery }
    } catch {
      return { isValid: false, stripped: '', hasQuery: false }
    }
  }

  useEffect(() => {
    const result = validateAndStripUrl(url)
    setIsValid(url ? result.isValid : null)
    setStrippedUrl(result.isValid ? result.stripped : '')
  }, [url])

  const handleStripAndNavigate = () => {
    const result = validateAndStripUrl(url)
    
    if (!result.isValid) {
      toast.error('Invalid URL', {
        description: 'Please enter a valid URL (e.g., https://example.com)',
      })
      return
    }

    window.open(result.stripped, '_blank', 'noopener,noreferrer')
    
    if (result.hasQuery) {
      toast.success('URL Stripped & Opened', {
        description: 'Query parameters removed',
      })
    } else {
      toast.success('URL Opened', {
        description: 'No query parameters to remove',
      })
    }
  }

  const handleAllInOne = async () => {
    setIsProcessing(true)
    
    try {
      const text = await navigator.clipboard.readText()
      
      if (!text.trim()) {
        toast.error('Clipboard Empty', {
          description: 'Please copy a URL first',
        })
        setIsProcessing(false)
        return
      }

      setUrl(text)
      
      await new Promise(resolve => setTimeout(resolve, 100))
      
      const result = validateAndStripUrl(text)
      
      if (!result.isValid) {
        toast.error('Invalid URL in Clipboard', {
          description: 'The clipboard content is not a valid URL',
        })
        setIsProcessing(false)
        return
      }

      window.open(result.stripped, '_blank', 'noopener,noreferrer')
      
      if (result.hasQuery) {
        toast.success('All Done!', {
          description: 'Pasted, stripped, and opened in new tab',
        })
      } else {
        toast.success('All Done!', {
          description: 'Pasted and opened (no query to remove)',
        })
      }
    } catch (error) {
      toast.error('Clipboard Access Denied', {
        description: 'Please paste the URL manually',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isValid) {
      handleStripAndNavigate()
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6">
      <Card className="w-full max-w-2xl p-6 sm:p-8 shadow-lg">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              URL Query Stripper
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Remove query parameters from URLs quickly and cleanly
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="https://example.com/page?utm_source=email&ref=123"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={`font-mono text-sm sm:text-base h-12 transition-all ${
                    isValid === false
                      ? 'border-destructive animate-shake'
                      : isValid === true
                      ? 'border-accent focus-visible:ring-accent'
                      : ''
                  }`}
                  id="url-input"
                />
                {isValid !== null && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {isValid ? (
                      <CheckCircle className="text-accent" weight="fill" />
                    ) : (
                      <WarningCircle className="text-destructive" weight="fill" />
                    )}
                  </div>
                )}
              </div>
              {isValid === false && url && (
                <p className="text-sm text-destructive">
                  Please enter a valid URL (e.g., https://example.com)
                </p>
              )}
            </div>

            {strippedUrl && (
              <div className="bg-muted border-l-4 border-l-accent p-4 rounded-md space-y-2">
                <Badge variant="secondary" className="text-xs">
                  Preview
                </Badge>
                <p className="font-mono text-sm break-all text-foreground">
                  {strippedUrl}
                </p>
                {url !== strippedUrl && (
                  <p className="text-xs text-muted-foreground">
                    Query parameters will be removed
                  </p>
                )}
                {url === strippedUrl && (
                  <p className="text-xs text-muted-foreground">
                    No query parameters found
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleStripAndNavigate}
                disabled={!isValid || !url}
                className="flex-1 h-11 text-sm font-medium tracking-wide uppercase"
                size="lg"
              >
                <Scissors className="mr-2" />
                Strip & Open
              </Button>
              <Button
                onClick={handleAllInOne}
                disabled={isProcessing}
                variant="outline"
                className="flex-1 h-11 text-sm font-medium tracking-wide uppercase border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all"
                size="lg"
              >
                <Lightning className="mr-2" weight="fill" />
                {isProcessing ? 'Processing...' : 'All-in-One'}
              </Button>
            </div>

            <div className="bg-card border border-border rounded-md p-4 space-y-2">
              <p className="text-sm font-medium text-foreground">How to use:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Paste a URL and click "Strip & Open"</li>
                <li>Or use "All-in-One" to paste from clipboard automatically</li>
                <li>Press Enter after pasting to quickly strip and open</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default App