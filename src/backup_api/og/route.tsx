import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest): Promise<ImageResponse> {
  try {
    const { searchParams } = new URL(request.url);

    const city = searchParams.get('city') ?? 'Sydney';
    const state = searchParams.get('state') ?? 'NSW';
    const sqm = searchParams.get('sqm') ?? '5.21';
    const savings = searchParams.get('savings') ?? '25,000';
    const currency = searchParams.get('currency') ?? 'AUD';
    const currencySymbol = searchParams.get('symbol') ?? '$';
    const note =
      searchParams.get('note') ??
      'CONGRATULATIONS. YOU OWN ENOUGH SYDNEY REAL ESTATE TO PARK HALF A CORGI.';

    const numSqm = parseFloat(sqm) || 0;
    const [intPart, decPart = '00'] = numSqm.toFixed(2).split('.');
    const rawSavings = parseFloat(savings.replace(/,/g, '')) || 25000;
    const stampDuty = searchParams.get('stampDuty') ?? Math.round(rawSavings * 1.7).toLocaleString();
    const strata = searchParams.get('strata') ?? Math.round(rawSavings * 0.136).toLocaleString();
    const cologne = searchParams.get('cologne') ?? Math.round(rawSavings * 0.018).toLocaleString();

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#FAF9F5',
            padding: '24px 32px',
            fontFamily: 'sans-serif',
            color: '#141414',
          }}
        >
          {/* Card Wrapper */}
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '2px solid #E6E2D8',
              padding: '20px 28px',
            }}
          >
            {/* Top Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                paddingBottom: '12px',
              }}
            >
              {/* Left Logo */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '32px', fontWeight: 900 }}>
                  <span>$</span>
                  <span style={{ color: '#F5C842' }}>0</span>
                  <span>SQM</span>
                </div>
                <span style={{ fontSize: '9px', fontWeight: 700, color: '#666', marginTop: '2px' }}>
                  REAL DATA. REAL PRICES. SAME RESULT.
                </span>
              </div>

              {/* Right Slogan */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, color: '#141414' }}>
                  THE AUSTRALIAN DREAM
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: '11px', fontWeight: 900, color: '#141414' }}>
                    STILL STARTS AT 0M².
                  </span>
                  <div style={{ display: 'flex', height: '3px', width: '100%', backgroundColor: '#F5C842', borderRadius: '2px' }} />
                </div>
              </div>
            </div>

            {/* Middle Section: Reality Score & Metadata */}
            <div
              style={{
                display: 'flex',
                gap: '16px',
                backgroundColor: '#F7F5EE',
                borderRadius: '14px',
                border: '1px solid #E2DED4',
                padding: '14px 18px',
              }}
            >
              {/* Left: Counter & Roast */}
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1.4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#666' }}>
                    YOUR REALITY SCORE
                  </span>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#888' }}>
                    {city.toUpperCase()}, {state}
                  </span>
                </div>

                {/* Flip Counter Tiles */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {/* Tile 1 */}
                  <div
                    style={{
                      minWidth: '48px',
                      padding: '0 8px',
                      height: '64px',
                      backgroundColor: '#121417',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '44px',
                      fontWeight: 900,
                      color: '#FFFFFF',
                      position: 'relative',
                    }}
                  >
                    <span>{intPart}</span>
                    <div style={{ display: 'flex', position: 'absolute', left: 0, right: 0, top: '50%', height: '1.5px', backgroundColor: '#0A0C0E' }} />
                  </div>

                  <div style={{ display: 'flex', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#121417', marginBottom: '10px' }} />

                  {/* Tile 2 */}
                  <div
                    style={{
                      width: '48px',
                      height: '64px',
                      backgroundColor: '#121417',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '44px',
                      fontWeight: 900,
                      color: '#FFFFFF',
                      position: 'relative',
                    }}
                  >
                    <span>{decPart[0] || '0'}</span>
                    <div style={{ display: 'flex', position: 'absolute', left: 0, right: 0, top: '50%', height: '1.5px', backgroundColor: '#0A0C0E' }} />
                  </div>

                  {/* Tile 3 */}
                  <div
                    style={{
                      width: '48px',
                      height: '64px',
                      backgroundColor: '#121417',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '44px',
                      fontWeight: 900,
                      color: '#FFFFFF',
                      position: 'relative',
                    }}
                  >
                    <span>{decPart[1] || '0'}</span>
                    <div style={{ display: 'flex', position: 'absolute', left: 0, right: 0, top: '50%', height: '1.5px', backgroundColor: '#0A0C0E' }} />
                  </div>

                  {/* Tile 4: m² */}
                  <div
                    style={{
                      width: '68px',
                      height: '64px',
                      backgroundColor: '#121417',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '34px',
                      fontWeight: 900,
                      color: '#FFFFFF',
                      position: 'relative',
                      marginLeft: '4px',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span>m²</span>
                      <div style={{ display: 'flex', height: '3px', width: '38px', backgroundColor: '#F5C842', borderRadius: '2px' }} />
                    </div>
                    <div style={{ display: 'flex', position: 'absolute', left: 0, right: 0, top: '50%', height: '1.5px', backgroundColor: '#0A0C0E' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '8px' }}>
                  <div style={{ display: 'flex', fontSize: '13px', fontWeight: 900, color: '#141414' }}>
                    {numSqm.toFixed(2)}m² in theory. <span style={{ color: '#D97706', marginLeft: '4px' }}>0m² in reality.</span>
                  </div>
                  <div style={{ display: 'flex', fontSize: '10px', color: '#666', marginTop: '1px' }}>
                    You own 0 square metres. But hey, at least the views are free.
                  </div>
                </div>
              </div>

              {/* Right: Metadata Box */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  backgroundColor: '#FFFFFF',
                  borderRadius: '10px',
                  border: '1px solid #E2DED4',
                  padding: '10px 14px',
                  justifyContent: 'space-between',
                  gap: '6px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '8px', fontWeight: 800, color: '#888' }}>LOCATION</span>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#141414' }}>{city}, {state}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '8px', fontWeight: 800, color: '#888' }}>DATE</span>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#141414' }}>20 Sep 2026</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '8px', fontWeight: 800, color: '#888' }}>PROPERTY TYPE</span>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#141414' }}>Theoretical Land</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '8px', fontWeight: 800, color: '#888' }}>YOUR SAVINGS</span>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#141414' }}>{currencySymbol}{savings}</span>
                </div>
              </div>
            </div>

            {/* Lower Section: Cost Breakdown & Sticky Note */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'stretch' }}>
              {/* Left: Cost Breakdown */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1.4,
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E2DED4',
                  padding: '10px 14px',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontWeight: 800, color: '#666', borderBottom: '1px solid #EAE6DC', paddingBottom: '4px', marginBottom: '6px' }}>
                  <span>COST BREAKDOWN</span>
                  <span>{currency} ({currencySymbol})</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '10px', color: '#333' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Land Value ({numSqm.toFixed(2)} m²)</span>
                    <span style={{ fontWeight: 700 }}>{currencySymbol}{savings}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Stamp Duty (on fresh air)</span>
                    <span style={{ fontWeight: 700 }}>{currencySymbol}{stampDuty}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Strata Sinking Fund (broken lift)</span>
                    <span style={{ fontWeight: 700 }}>{currencySymbol}{strata}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Agent Cologne Surcharge</span>
                    <span style={{ fontWeight: 700 }}>{currencySymbol}{cologne}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Landlord Mortgage Gratitude</span>
                    <span style={{ fontWeight: 700 }}>100%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Emotional Damage</span>
                    <span style={{ fontWeight: 800, color: '#16A34A' }}>FREE</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #EAE6DC', paddingTop: '6px', marginTop: '6px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 900, color: '#141414' }}>TOTAL EQUITY ACQUIRED</span>
                  <div style={{ display: 'flex', backgroundColor: '#FFE243', padding: '2px 8px', borderRadius: '4px', fontSize: '13px', fontWeight: 900, color: '#141414' }}>
                    0 m²
                  </div>
                </div>
              </div>

              {/* Right: Sticky Note & Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '8px' }}>
                {/* Yellow Sticky Note */}
                <div
                  style={{
                    backgroundColor: '#FFDE43',
                    border: '1px solid #E5C300',
                    borderRadius: '10px',
                    padding: '10px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <div style={{ display: 'flex', fontSize: '10px', fontWeight: 900, lineHeight: '1.3', color: '#141414' }}>
                    &ldquo;{note}&rdquo;
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '8px', fontWeight: 800, color: '#333', marginTop: '4px' }}>
                    — KOOGEE
                  </div>
                </div>

                {/* Share on X Simulated Button */}
                <div
                  style={{
                    backgroundColor: '#0F1419',
                    borderRadius: '8px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontSize: '10px',
                    fontWeight: 800,
                    gap: '6px',
                  }}
                >
                  <span>𝕏 Share on X</span>
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid #EAE6DC',
                paddingTop: '8px',
                fontSize: '9px',
                fontWeight: 800,
                color: '#888',
              }}
            >
              <span>0SQM.COM.AU</span>
              <span>DIFFERENT CITIES. SAME PORTFOLIO. ☺</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      }
    );
  } catch (e: unknown) {
    const errorMsg = e instanceof Error ? e.message : 'Failed to generate image';
    return new Response(`OG generation error: ${errorMsg}`, { status: 500 });
  }
}
