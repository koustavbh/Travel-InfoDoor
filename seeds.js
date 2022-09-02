var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
    {
        name: 'Cloud',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQigIh_nZGSpVUtmYoPtMQKhY9swsYJOt3UAg&usqp=CAU',
        description: 'This is awesome'
    },
    {
        name: 'Mountain',
        image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBQUFBgUFRQZGRgaGxobGxsZGxsYGxgbGBsaGhsYGhkbIi0kGx0rIRkYJTcmKi4+NDQ0GyQ6Pzo0Pi0zNDEBCwsLEA8QHRISHTMqJCozMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM//AABEIALcBEwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAADAAECBAUGBwj/xAA/EAACAQMCBAMGBAQFAwQDAAABAhEAAyESMQQFQVEiYXEGEzKBkaFSscHwFELR4SNicpLxFTOCB4OishZDU//EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACIRAAICAQQDAAMAAAAAAAAAAAABAhEhAxIxQQQTURRhcf/aAAwDAQACEQMRAD8A5cLUgKcCpgV7h4iIxTxUgKeKCiEUoqcUooAhFIipxSigCEUoqcUooAGVptNEIpaaAB6aaKJFLTQIGRTRRIpiKBgyKaKJFMRQAMiokUQikVoAERTEUQrTEUCBRSiiRTRQAMimiiRTRQAOKaKJFMRQAOKYiiEU0UADIpoohFNFSIERUWWjRUGWqGA00qJpp6mirNoLUgtSC1ICqFRGKUUTTSigoHFKKLppaaABRSii6aWmgVAopoo2mm00BQKKWmrnA8L7y4lvVp1GJOYrruH9hViXvGf8qgfLJNZT1Yx5ZcNOUuEcJFNFb3NvZ65ZYhTrX+WPiPqorJeww3Uj1BFVGcWrTJlBxdNFeKUUe3ZZjCgk+VdRyT2ZR1Ny4WAABAIUqcZiGOqPlSnqxirZUNOUnSOQCTsJqJWu4e3wxZw6NohVCrbKMTnxEzIAj5z5Z5ziuW4Z7eooDkHJWZiSN9j0qIa0ZY4KnouOeTIIpiKLFRIrcxBEU0UUiokVIAyKaKJFNFAA4pookUxFAA4poosVGKABkVEiikVEigAZFKKmRTRQIhFRIqcUiKABaaVEilVDNsLThakFqQWpKIRTxU9NPposAemn00TTT6aVgC00tNGilFFgC002mtLhuWO41fAn4mkTgmFH8xwa2U9msqSjESASHVQ3clTDAenynes5a0Y8s0joyllHKgRkVoLze/Gn3rx6710t7kdoDw8MxPeWP08eKe3ZVSAvDAHubef92mJrGWvB9GsdGUezI5Ja4kuLiBmE5LTp7ZJ3ia1uIt8RcVlJgHcBSPX4gK2eGs3CfEucbsDH/wAa5zm9i41xyLjsitp3gDpGkbiQawepuleDdQqNWVOG4K4gJThkIG7uusiOpV2Kj5Cup4C5xDWfeXFV2kG2mFEbAntsTM9q57lvCXM27Z069JPTAyAcfuKte0fPL1sraUssFdTrEkKQCFHyJ89ulTNuToqCUVZb4nnPFJ8XBnHZ9Q+qqT85rLse0J1sQioWECdTwe0Yie3enbmDgPcOpxBgtgEyNyJgAE4Bk48457jn94pcQG3KiR1ORO42kz1pxin0KUmjoObezBuPrBRCQTpVCvn4lBgHua5HiuDuW/jUgTAbdTvs2x2NddxfMLtlEVCYjTqeCzQsa1G0EyfQA9az+C41y6zcO5bOZKjUYU9YB+tbaepKKzlGM9KMnjDOZIpiK3eK4FbiPcVSGDx4QQpBAYkyIG8Rj59cZlrqhqKSwcs9Nx5AkU0UUimiqJoFFMRRoqOmgQIimIosU0UACIpitFiokUACIpoosUitAAdNNpoummIpgC00qJFKgDbAqQFSC04WpsoiBSiiBafTTGDinijW7RYhVBJOwAkn0Arb5b7MXrhBddCdSfijsq7z6xUSnGPLHGDlwjK4Dl73TgHSCAxx16CdzV7lnD2/eJEk/E2oA6Qpk432G/ciuxv8tt27Xu1XTIKiJbxEQWbuSAQT1EjYxWdwXL/d2/eNgwZjDBTABmcE5x/mrjnruV0dkNFRqwXK3u3GCsdOkm5pMArOyNqE6YYHGeh8rnFsAguQ0yWVSwnPg1N/4qPn1rP4/wBojZuLcKEo4EhfEwBMFwBknrEZ0471q8SVukm3lIUBgIDLGIYiCN9u9YvmzVfAXAcw1r48dpEAjuJaDj8qtjircagZEwSIgVk/xdv3i22tAk+GSuwmDjqAJ+hrpk5dbRNKoAOwEfP1qZJIaZnHiVnwAkmNt89TjA3qgEjWSpguMtCsxysDbHb+9a/DctfW5djoxpGoyI3nMD5VaHLkM/Fnzj8qVpDqzE5NdAuOrN8KqRJEAGckfi85g1kcTw7NcZntaigc+IjQCwlZiSzSfTExvXZcNyqzbkhAWbDMckiZgk+f5UDm493ZuPaUK8TIUEkz174nfaqUs4E44ycn/wBPKqWuonTw/CBIEiVGDicYqheRCBb9wvi1A6S0yCY0sd4AB7TvVrgfaCVFu4ms4CsMkk4AM7nz69fPd4a2CNRQAnfctGcGfXaqbceSUlLg5dOC4m4EZjsNPjJzpnJXrgDOZwdq2eWez6JpuXT4pBRdoJOCZ3PWPWt4WwIx0ApJwmpy5uPH4QYBxGf6CNvWZeo2NQSDPaTQbbAMCDqBzqncH5VxXNfZdGU3LVwIJI0ucYbSBO46bzvXXcTwAuE62bM4BKgA4Awe2KTcHbVVSBoBBAOZIOrJO+aITcXaY5wUlTPIr1koxVhBBIPyocV03PxbfiSDCpKgsnYgS/XMHby2rI4nhApGl9QIkGCOpGx8wa9HT1VJKzgnpuLZnxTRVo2DUTYNaWZbStFLTVk2TUfcmiwor6abTVn3JpvcmnaCmVtNNFWxw58qkOHHU0bkPayjpptNXnRB1JobBelKw2lTTT0bT5U9OxUbScM5EhGI7hSR9asWeW3WgLbYk4GCPrOw8zXp3DvbdVdCrowBVlIZSDsVIwRRQw7Vwvy38O1eKvpxFv2SfTL3AD2C6gPmSJ+lT4f2YT+a4W8lXTtjfNdm5U71XtJbGVI+vntWL15vs1WjFdFfgOWW7fhRAq/zGTqJ8ycnrWnZjZdh6/rVPiePtWka47gKu8ZOTEQMkyQKzOdLxN+y9u0ptBogkjWynLDSvwTtkzvWeW7ZoqWER577TWbIfSPeXFxpXYd9TR07DOK5m/znib9vWNKJpyQYUsToXwky0gPH+idhULC8Jw9sXOMNx7xP/YUFnhSFkjdoBByRMHBiulVOGuIpt21dMMunUF2x1EmKvC6IyyuZThBbKBrzgAK3QsWCA42hST5UDgea/wAFcHD3CGtF9KsRBXW0YZZDAGZGDnpEUW/zW3auh7lltRPxAExGr6bnai8tuWOIDi8yObjkqfgQyQERcyrDGGyTMTJo6yg/h0n/AE9C8sAQIMeYMz9qscRcAFVOH4dra4J6CHOqIiYIMwex29MUe3dDbgDy3+h7VkaADxJwTifqasu/RR67/s1H3SAyFz0oiJQAkSuU9vub3LSLZtMFe5JLaoZVBA8I8858vp1+wk4rjPafgBxNwXbcllUJuIIkt4TtuT6z5VUKvJMrrBw5eCqyOxP4RG8+ePrXYezPNyQbd1sgjQx/mB/l9R57z5VzfE8K1sw6MDGARE+k/SahbdlhhhhBHkQZBmuiUVJGMZbWeme9XqQPWopxiTCmfkYntO1ZXJeY274jIcDKlifVl7j7/rqi3mfzP5dq5mqwzdO8ohxnGBA0ZONoET1J6Cs5ytxw2TAj+aMkMOmTt9avlQSQfyo9iwANgKE6A5riOSh3nS07TnzksTv2xWle9nrdy2LerTB8LQGKiZCS3i0j1rX0Zqain7JC2I4ziPYpwDovIx6AqVn1IJisviPZfik//XqHdGU/aQftXpKpRBFaLyJIzfjxZ5U/IeJC6zZfT6Sc/wCXf7Vn3EZSVYEEbgiCPUGvZdVVOM4S3dGm5bVx5jb0O4rSPlPtGcvGXTPIj60tNeucHwNu2NKW0Udgo+53J8zVXjPZzhbhk29J7odHzIGJ+VWvKjeUS/Gdcnl62zRBwhNdrd9jFBm3dPo4n7rH5U6eytzb3iR6NVPyI9MS0ZdnFfwJpv4UDzr0Gz7Jr/PcJ/0qF/MmaMPZmzsC/wBR/Sp/IRfoPOP4XyNKvTP/AMZ4f/P/ALv7UqPyUP0HiXsl/wCoF/gUFrStyyCSEPhZdRLNpcdySYIO/SvWPZr2z4bjpW0zI6gFkcAORmSkEhgOpG0jaa+d3SKnauFCGQlWGxEgg9wRXLR0H0Z7Qc192hCugOZ1FcACcycVZ5FaDWBdQanZCUnoSPtmvD/ZrnlhLq/xttrlvqVIDD1GNS/MHfPQ+3L7R2HtL/Bm26AdCECACdJWJUgdI9YodVSEru2WOT8mFmSwDOx1E7hSDjTI36z37Vrpb05Jz515tf8Aai6byKeKVFfMWwbmlG+GCqksxH9dq0+Se0FhyLKcS9x3uafErAkxqKiSR3kmI0tvApNPkE0V+fcpv8RxLpcu2xZktbGDcYaQChGCAMmcjA74DwNs2All3ZrRBKtqGtIXURpiPd4/D4R1Aitzn9vg0uqb7qpKwCx0r3yZzsYBxg+VNzTgVv2Fe26aDDEhZ1oRpwVIIwTt32pqXQnENw3BlZm5rBEqCnh2j4gTv+xWJzrlA1e8tXLaGIa2+EfOwfTkz0b7VE8h4vhrRTgrlvQWLarrMrAEZHhBRjMZgeczNXb/AAKSHbXrENJGpCYkHqrR5U06fINYCNzm7wy6rvjs6fE2dSODERtoPTMH55X/AFi1cK6f5wGXV4QwIkaScfI1icfzlL9w2PjT/tsoMMQ4grIiD2q7wHKrlpo4e3NtQAUe4QZPRAyacf6ztmnS7Ffw6CzxbWxKgiPMaT8j/anX2mIJU2SXAJXScNHQg5U/UGN+lUF4ZlPiDqTmCJ+hWRWBzrmCA+7uITGcgggHqpGRSjG2Nuizb9qbl66hdtKNjSICjrlj1kRkx5V0nAc3tXEUornp/wBt9IPYNEHYjHauAv8As/cs3FNoMEJBS4im4oIOpdthOcjrtVfmnOOItqlv3igG2FATACNJ1KQck/ijp0GaqUE+CVJrk6b2h9pbNwm2LRdFMLc1ac9dIgkD13jbrXOrenxKZGcSDHzFYw4S2QWNwwN8gR3knenQC3DayQcASIP33jYitYx2kSdmst8ghlJBBmQYI+ddZyn2mBhLxAIwHwAcE+LoNt9q8+uXle2XRmx5xB+XTJFV3ui4hbJhfFOo/STtg/bzpSSkshFtHsr3dLiBufUx1Jq6LxmAuAB9Tt/X6d64n2N5sb1trLtNxUEMD8SbBpHUEgGe4rreBu+BSTsYzJOAevyrnkqN07Lmo9RmpKagLhgnEDaPTufOs7hOZu7N4RpVipII6HHrjT82qaA1waVZvE8yC3FtgfECxODpAkyR6A5o6cUmkyw8zsJnucd6KANfvqgljGw+Z6VVbmFsZ1L1O427+ma57nfNQx0op8JnUSImN8ZkVscp4e3cU3AqgtpmFiAVDaZzO4k+VVtpWxXbwS5Zxtx3fClVIMgnYjCiYk43Mb1rq4IkEEHYjY+lUeGAFxgNyomc7EjIqdt3RmFxoUt4CxAmYhQRvmcHPrvUspFuiqIquTEnttRAmJzJEH/ikBJmnFERKjbt5nr27VDjLsCB13pgObg70qyvf+lKnQHzCpp3WKNo7Gh5G4FUIihrQ5bzK5ZYMjFSNmXcT+Y8jVFRThR0NAHVcD7QXRcNxTaRyZNxbYNzPhPbUc/PNafC8VxRhveOulixuMNDvrYSrDV2I8hAA6VxFi4RsK07XOLhGlmLDYE7gdvy37ClbCkdXzPjLly8XLl5Jlmgp8IUoqgxpWOm5M9cWeD5vcsSbbHbCaj7tZIPwbERqGc56HIwE4tFQBNgMnrTm6XXHhHSd2bz8tsVDbLSR6d7O+1dm+RbPgdh8DbagM6G2I3wYONq3+IfwNLBY2JiB6z0714vethV1SQwyIxEdfL1oy8/4k6i1131KFIdiRAM47Hz3prIqO4u8tsX7jseHUOsa2FyNZDQRpXBXSpySDsMEGNy57QW7YBvr7vcAlgyY7EeXT13ia8hfmDgDRKkCPiYgz8WNoPXE+dbl/2gS9YdHLBzpEHxBiAZedhuPMbZ3qmTR0fNPba3buJ7u2j24ZrhtOGfMmdIhZmNzmTkVYv8VwXH2z/iAELAB8FxNUZAM6sxtIxFeXOoz0B3jPbf6CrXC8KylSlyCMhrZhl1RIkHH50YWQps1vaSzeVLdpmNwIpWy1oEAlIaSqli1yEjYRnMVc5a1xbbh/c3HTA1qHLEhnR0CjUyskZPWRnoBecaoDAu6lSJhWJJ0lgy5LgAwPONxkAIW8zl9BgphG0EOpBWVAIEMc7jw+Gq3i2kOP4abjWyxLA6gCjKHnUWIB6gjGdJAxVLSqrp0lTJOFIwN62bt9NYW1bW6SyhM6rktplwBBDSJxsT3zTcw4JlXU7NgQyNL52nc6VwNj5Cd6uOp9Ilp/DM4dVU6YOhlzONJ9OhMttS/wCkhDKsY6ggT8j2+VRJFx9J1I/UY2O7KxHadq0rDkiDuAPn57DNa4MgnIHXhrwuKoiGDARqAboJ6SAw9Irv+Cv22uEo+pLgBU5iRIZYOxnVI8orz4YnuPvV/lHHvbIyNEkgfgYmSfQmZ9dt6znC8lwlR6BxtwaCFPhUjVA+CcCZ/wBXb86DyTggqmJnVPTEgYx5AVb5hdRrBBIGtFYT11EacdckfWo8qtFrcatMzOM+e/X1rDo27Kl/hV/iRcyNMAQOynr2yatLxCprgF9JOFycLJ3PTNZfFX4v27ShlbBeQCCACQpbUDmJ67itPgOXDU5Phl2YkGTBAHUeGQMx55zQwRwPEXnZydDCSxyAFEn8QyK7nklhrfDKTAEF2JkQN/8A6wPlVDltu22dCyTOw3zXRcbb/wAIqAcgTHkRirlK8ExjWTI5Mzm4zOZLlm9JM6fQYrR47hDdDE4UY0nOpQZJgbHeKBwHDEEEkegg7xua0rrQsCofJaKNi34AqkpqO2JHfcbnNaQjaqPA8uRGDmGcAic+EEkmJJj4o3mIq1cvBZEgQBJ6gHb9f70gC3Lmyjc/YdTWXzridAAWSwBOkZMEgAnyn9au8OwI95329Jx9d/8AihcxuKFliBgmSQNsn6CaEDONdb8/APmc/OlWlc5lbBI1D7/0pVtb+GePp8+K81IihsKdWrM0EU7VEb4ijCougP8AX+tADT0/YotsTPfv39RQCI3GO46fvtSRihn/AINFBZdRCNsH1/c1rcBxikqtzw6ZjsxPUnvWMOJjIyOuKse8B7ehqGUdFdGsx07/AK+lULqQxAnFV+E49kGndfuPQ/oav29L5BwP3EUuB8gA3eosnarDKAagYp2KgCXd9WAIwBO9K1xEGUb9PsambKzMb743nuKiOH2H9t6q0Kma9jmyMIe2skrLGWWFkKNPxKBM7nIGwpWOYXLYdbZ0q8iMlRP4QZA233rFdNLETt96b3xGD8qVAXiTOqZIzPWe871E8S//APR/9xPl1+lV04icH6/1FIpmR/YmnQWGa+TAIiNj+npReG5i6sNeRtj84j9yfKslnaTq7b/pUX4gwIP9fnWkW0RJJm43OiDm2R6N+pEVcscxTeYVtpxDdQe04Oa52zxAbf6Hyo9ohTOCDuuw9R2ParU/pm4fD0DkvtK9rStyHtA4GCyYjwN+m1d7y68ptqysCGiCNic4H0P0rxfh+MU4np13+dX+G5lctibdwhTmAfCek9p86JQUsoIzccM9H5Xw63Lr8Q0SzsEOPhGAQe0A/Kav273vbTlGK6mZQwgyFaJEyCCB964g8xQWFawGEC4HBYtDEKB3gQrR511HIuIt2+EtrrEr8QGT4gWGP/IGaxkmaJh+V8B7vwgYHUkyfl0rV4tjo0jdsDIk+lA/iUChpABz6z1pjxgMsMAiQTiF7mfTpNSMhw1nSdJuTByABv60dWkhckg57A9BHp+nWskcb/iaEgknoJPXI7d5oHMOPb3N1LasrhRGrw6i0lj3/FnrBjyKCy5zDmykuivASJIzJMmJPTw56Z+oOF4g3mCEwIDP/mIAgg9ABkzsTXPNwgAS4pEPbRmLGZ1y5jaSS64AAwavcMLi29YwzsJJP8vxEbZnEnyjvQxo6hrsEsSBbTt5dh3JgfKuU9oub/4gXSrQh8BIZRIMO/lAHqBiKq+0PtZb4a0LNka7q4k5VXaYYn+aPEY+sdeE4W5ccO1y5qJzP+fMnV1oTpWFW6H4rnMuxLMSTk5E0qH/ANMstkhiTuc5+lKj2R/Y/W/0co1o/hP0moMtaTYBAMnzOmOsiMn503vWAI3J64x8oqNxW0zlaiAzV3UpGVHrtO2/nP5xTBLf4Y+Zx26094tpU/f/ADTacyNuo6VcNq3IEtJ8jA9TFM/Cx8LD54o3oNrKmgj4eu43pCVz0/L+lGa2y74j95oqcQwEQPkIqrFQEOGH5EUSzxDKd/Q0rsNEEg/T8qAzsMYP78qOQNWzxn4vSRJ+cUW25Ykxg7ZrJS9iNP6/SMitPhbZABknGwz6ZnGPzpPA0HOOv61KfShKtwnCET3n9asrwjYmPuPyqbQwJhv3+tDZR3BHY/12or8GR1E/l2z9en54j7s7EgnyOaaaFTAi0Z/Q4NIJBkGrC2nHQEfKPp/SiaA2/hP1/vT3BtAOQwhhnaRj61Ru8KQcZFaZtEdVPof61GV7j9+VUpfBOJk6DOcef5fKj2HIw3yPQ/OrT6N/yNRDgHTIIOYOxqt1k0SCdQSD37H1o1niCMNnzn8xQ1CdCVPY5H1p2TSc/br8jRGbiwlBMtLxty2/vFGpDiDlT5N2Mj7Vetc5U3RcBdV3KiCwKrCgaiAVEAZO01Q4a+yHVbYrODgEEdmUyCPIirVm/aJm7YUkx4rbG02OugHRJ8gKp6ifJCg1weq8lS3fVuIN73q3FCqugKqBf5dEmGB/Z3qHG8ouNbe3bv6dfhlrckJB1IGBnPfsAMb1xHJ+aWrD6+FvPaJ+JLwD233jUUnSR0aB6xXR2/bQwdTpqBEBQGDZyJBMAfin9ay/hdHWcDat2wIA16QCwXTq0iNu3lPWsXnXKjdZ7iXWDMAIM6W0zElZ2nt1PerFj2u4JyAb6qY/mV1Uf+TKBT8x9puDtAE3Q56Lb0uT1zGPqetLch0VuV8jQIouXCzyswsLC7Is7YET5YFE50eE4UB3JZgpCW9XxnI1N2GTk48iYrmebf8AqEZ08OiJj4rslvkqnSD6muI4nnDXLjG7c1k5LZAJ9QT6ZqXK+Cki1xEPDMokEknOWOSQOvl2oTN0AmO+30G9VL/HsTCjV6ZGc/OKYPccZlc9tJ/Opp9l2kXdV3z/ANwH26Uqzv4U/ib9/OlRQWVdCzvKkDGGGCRt0/eaFcQggFlUbZ1KSewVR+dE4a4ryy7AbmBHePtt+tOLm8MpiZAbIAxOQc/lNAgEKT4QTiQVIMjI2JwZj+tQTUTGliTssiekjYwfvV1VBO2Rsc+fcT0FNdkQJaPF36CSM7iDRY6KwDAFjJI+Lfw7YPpP5U+voCp26wIO23pt/wA1aWGGe2TsSOxjcflihvZGokx5actPq8iKQgChmiEMfKMzHc96iyeWOpn9Iz+8VbuIqiZAGw1eMdSRg59elRe2dyoIHyidunn9qdjozw4n4WA7nt51I/nVr+FUyTqE531AHyx1OO21CW2gEhtIkzqA+SkyNoJj1xVKRNAghG1TsLc1SCQe5P6dfSrCe6DQWaIJJgQDGBj9TRla3oLkQRtLA6h00kd6NwqNNDpUM+D5bT670FrkjwrmNziPX/mh2mRlDfCBBlgSokTE5H0ovCOjgNrHiJA/lkjcZqOCiC2nwTB7ZaatNZhZeFB6bfUk5q6gQeIfU5j5gCg3uL3IUHHc/YTFKyisnDrG5yMbiYgYB3GaLb4ZR0Hpv9qoNzK4TlFHaZNTt8fc/lie4WSPSntYrQbmThFCgZ6yIgfpWWTO4HyxVwcK7SSfmxH3PSh3bSIPE8nsg1QPMR6Deqjgl5Kvuw3Ux9Y8tpoycCTBUE9u3n5DbrRLNxM6Ueek7/RZ/LrV1luMsMQBiEicDuZ9abm0LaiknCBR43jqFWfoSYPypOQT4J8gJ+wif+an7i2uGkyemBmiJfVBCKT5AGPmxyfSk5NjoIiaRlQT5mc+dR1lokfTAj0oatcc7QOwEAUZuFY7kfnU39GSwYOn7/0qQcjpE7+dJLKqIGSepz9ulOihRknH4iAfvSsoFc4hV/c/aq124W2QtPXO1Xy6CYQswAMKssZ2ie/96NYuFhq06BEwT4hBIMqI2z1otIVWY/8ABuwxbjzJ/fSnXlvVnAHcZ+/yrV4i2Ss+LSJIgMNWMLMfveqPFW1dwCCyiTrL+DwkEGAQzDY4yZ9YakwcRWeBtgjxFj0IOD0wRvV4WgDmM/M//KBvQU4lFZAFkOPCUtkKFAPiYxviZg43EzT+/EhgrHwjChtIJzIwApM4J7bUm2wSQZnHaPUx9ulKh+9vbj3ec+IEGTkzHnNKlkrBxCNoaRMdAenz7x1ArSscQCAAoHeYIgeXU+p61nuo7/T+tPkZz2zWryZo3UQESIgdQCMDqOwG4n7ZiSOQRDY3nScDMzjfCiCep7Zxbd91OD558JPl51pWL4YTokzPXHrn0+sVLVFJl1GB0kj5fhiBOd49NxQHvqurwjVnK5IG5MADcZ+VRHvmI1roT+Uk6cAnHiPiOZ2+VALoGIN0EwBMF12idQ8MbDBjFCQWL+LMbHEdDqIE5HcR51Sv8VcJ1JKiBAU/h3mNok1YS/aJUOX0HLEQGGmYGnY9Mg9fI1uWDYiEtE/6yc77hf1PSnddC5OTdWI1ap7gmCIxP239Klw63AQQGb8QWSY8/r6V0HEcxC+G3bRCSRPuwAP/ACIJzjNUeKW9c0zLAmdwAM9I26H501IVAGLsxgHc/Ey5OBuGx8qrtYgxr/2iRpJ76gSNqNa4B/wnzgSOm/1FG/gCdvCMiGVgD6eXn5+VO0FA7/GSApyoEEAKobIOSB5L6Y+bMtt1ESsH0GwmMnM6vt50T+A0/wAwnqM9cYPUfPFI8DpyInzmdx0/X1pWgphrVq2FEcQPMaCB+YkiBTX+IFtdKOzE9dhBPaeoJOoz070J+DYjUADHbfPUDtnpQlssp69ekmT2x60DLC80ZXJAgfhaDPUSQN/MCD5A10vD8WLiyjkAx2nIwI6VyyWQdyFO8REz5bj1q7b4NHGbmmD3MGIMqwMTsZ8hjFJ0GToE4JGM3A7jPh1acmOoXbG1FezwgEBAmf8AI58vGxUgVm2Etzh2cgfjDtHedXpV1UaD/hvHqBG/QEmd6lsdFq9wltQCLmqeyxGerTiqV9AJ8X+0qw+oqwnCz8UAGMhmfB23IA/vTHh1HhJBMz4pkRG2Y69e/wA6mwozfeScAAZ6j+5+1TGqQoUk7QoJ8tyABVxGAEQm2SoEkecZ6bTvR34siOpkYmYjOR1nzHXptSsdFMcPc6qFj8TRkdBG5pWuG3D3B/7a68HAOZxOJgZ+7XuJABa46ARgFdRkn8t8RVUcwtzqa6OgOMGQOhmDOSd8R6Ay97m2SI8Qz8bNpGMaguBON+xpmS2IHu1BlWhRpMyu5CgEQQZycncmKBe44BtGhNEAyxjJBhQoBGkaRPTyqNzmOohELnUJdSFWTiC0n4RjJIgA5zStiwO16GCQQQREgvlT1ZQVmBIkx3GJo4uT/iKGLANIBnWclYLTG4mcdhG1W9xcAvCwB8ANwfDEqTkAfFtJ9MVHh7lw22uEoqowBDB8zB1rJEr8SgD8IknEugstJwV64UVYJZgqs42LAqBk5JnfbapcRwTW3a29wlgTOg+EPpELKmJIExvtvQ+D5s953fRhGLoxBII0hAug/CmkgmOpXMxQCJHvCoJXWV8AXVcOrKL3UHVJwPDMwNIMvXLujUEhiFZSHCnQYk6CJ1zpjCn4jvE044v3bowtsxdRugYjUD4iyDBOIGkjT6zWTxwFx9fu2YlQwcZ1kaIUoTuJjSBMAmNzWknDDx3GhFMpbDnSxDEnKDH8q4M7RgZDqgK1y5dJ8KrpgAf4+nAAHwmdO21Kqz8Yox4sADFu1mBvi22TucnJNKqJs57h7awZaHBACwdz1kY6RHzmtu3y22qs9xSqJHwtqnUSB4dK5x3pUqqQkG97wyhiLBI8WkkiG0xJiZXp54qn/HJdIDN7r8ItqQCTghyDJBI7fnNKlSXA2NzFuGPiRChyFOt3YkEAklto8o+LqNsv3IkAEyWKiQNxGSQdvEOk0qVUiWWbPLrbRDsx2YBAoG/8xfJPpFXLtthCCEXCwO4GNUbnz9aVKpYwtng1AJbbwzPTVBG2e1Evn3ayBsOmNv8Ak7+XampVPZXRRbm6yISBG+5+h+XWmfnEkwhkbAkbbdsb9+vlTUq02oi2UrvOLxwWgdgB+e9HTjmAGoBsnfc7bxiKVKm0hJmjetXJ0lEVwASJMad8kTuJOM7elZ3GXWVjqOltxpkgRB8PbBp6VSimFtC6XVYjUs7gjSSQTk9M+dE9063ACqwoJOFgBQCRpgg4YA4zn1pUqT5BFnh3uNg3GS2cygVZGVgBQPuPrV7huLuEAO7nwqdTFSfiK40iTBDgSennNKlUMoq3uc6HhfEs+YB6eEnKn1H9aDxPO3Ix4cGdjmZkCPlFKlVJIkrXeY3HABYgLnw+E/Y/ajWuLuuQquASGIEQTpBJzB6dzTUqQIuW+UXXl7pOhRIaQTGC0CTGNX0G+1WrfILaaC7uxZQQq6Vb4Q2WiJ8UbxA6zhUqRRqcLwNuwzj3SEgLq1+PSxZWwzAnVgDA05nuAHi7pPjUAgsEIgWyWCkQoQYWGOZBMzvSpVPYdD8Py0DTc+FS2lEgPLeEFWYkYJXt0ORiZ3hKlWhkMjJaXJPiEgDSMxMSc7UqVDGiu/CgeKFUCBhQSAASEUgDSvhYk9Y2zmT8quEqpRWYozIYVYRTMSGxAzEHfqRSpUIGEscLDazcCW7cAuA3QByAq+I7T8oz1zOK1XGW+bjBJBM5AjYKhmJDfVukUqVNcifBYXlJgEOqjeGvcQCJ7hFI+58zNKlSqrKo/9k=',
        description: 'WOW'
    },
    {
        name: 'Dog',
        image: 'data:image/jpeg;base64,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',
        description: 'This is great!!'
    }
]

function seedDB(){
    Campground.remove({},function(err){
        /* if(err){
            console.log(err)
        } 
            console.log('removed campgrounds');
            data.forEach(function(seed){
                Campground.create(seed,function(err,campground){
                    if(err){
                        console.log(err);
                    }else{
                        console.log('added a new campground!!');
                        Comment.create({
                            text: 'Wow',
                            author: 'K'
                        },function(err,comment){
                            if(err){
                                console.log(err)
                            } else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log('Created new comment!');

                            }
                            
                        });
                    }
                });
        
            });*/
        
    });
    
}

module.exports = seedDB;
