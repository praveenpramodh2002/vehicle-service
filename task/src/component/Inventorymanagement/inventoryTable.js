import React, { useState } from 'react';
import './inventorytable.css';
import { jsPDF } from 'jspdf';

const InventoryTable = ({ rows, onEditInventory, onDeleteInventory }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Replace this string with your base64 encoded logo
    const logoBase64 =   '/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAH0AfQDASIAAhEBAxEB/8QAHgABAAEEAwEBAAAAAAAAAAAAAAcFBggJAgQKAwH/xABUEAABAwMCAgYHAQgQBAMJAAAAAQIDBAUGBxEIEgkTITFBcRQVIjJRYYHSFhcjQlKRodEYM1ZYYmNyc4KSk5SVorGyGVPBwiRU0yUmNVdmg4TU8P/EABsBAQACAwEBAAAAAAAAAAAAAAACBAEDBQYH/8QAQhEBAAIBAgIFBgkLAwUAAAAAAAECAwQRBRIGITFBkUJRYXGBoRMUFSIyM3LR0iRSU2KSk7GywcLwFkODNKLD0/H/2gAMAwEAAhEDEQA/ANqYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHTul4tNjpVrbzc6Whp0XbramZsbd/hu5U7fkSrW15itY3mUb3rjrNrztEO4CwK/XjSi37pJlsMrvBIIJZd/q1qp+kte5cU+CUqqy3Wm71rk7nLGyJi/VXb/5Tq4eAcU1H0NPb2xMe+dnF1HSXg+m+s1NPZaJnwjeUzgg2g4iMqyL2cV0juNduuyStqHvYnmrYtk+rkK3T3ziKu7eaDEMas7Hdy1s7pHonx9h67fVDbk6PazT9WpmmP7V67+ETM+5pxdJ9Dqo30kXyfZx328ZiI96VwRbLQ61U8fXX/UrF7RGq7c0dEj2p5LKjTqSV9bDulz4mbWnxbDS2+Jf0q5SFeD830c1Z9UZJ/hSY97bbjnJ9PBev2pxV905In3JdBCs96xhN/SuJCvcv8Q+nRP8ALGp8fXeG/vjb1/axf+kbo4Dknyp/d5Pwq89JMUTtyx+8xfjTgCEGXfG3O5qPiTr2L/Hugcn5nMRDv096qOxKbiasz08G1NHQr/3NVSNuBZK+Xt66ZY/slKnSPHb/AG9/Vkwz/wCSEwAjiiuOaO7Lfqrht3Ve5JaHl3/spyrx12q1KiPqLFjFyYvjS3GancvzRHxPT/MU8nDrUnaMlZ9s1/niq/j4pW8bzjvEeqLfyTZeALaiym/RbJdcBu8PxkppqepYn5pEf/kKpS3+2VKJvJLTOXubVwSU7l8kkRu/03K19Llp17b+qYmPGJlbx6vDk6onafTE1nwtESqIAK6yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPjV1dNQUk1dWTNip6aN0ssju5jGpu5V+SIimDeoWd3fP8jqbxcKmVafrHpR07nezTw7+y1E7t9kTdfFTIfiYzX1FiEWMUc3LV3xytk2XtbTMVFf5cy8rfmnMUPQPRSCnpqbOsuo0kqJUSW3Ucrd2xsX3Znove5e9qeCbL37cv0LozOm4DoL8Y1cb2tPLSO+du3b1z2z3RHpfMOltdV0j4lTgWinatI5sk90b9m/n2jsjvmfRvFg6d8PuWZm2K5Xbey2p+zmyTM3mlb/AAI+zsX8p2ydu6bmQGKaIadYk1j6exx19Uzt9Jr9pn7/ABRFTkb9GoX6DgcV6U8R4paYm/JT82vVHtntn29Xoel4N0O4XwesTFOe/wCdaN59kdkezr9MvxrWtajWtRERNkRE7EQ/QDzj1T4SUVHM9ZJqSF7l73OjRV/OcfVtu/8AIU39k39R2QS57R3ozSs9ezrerbd/5Cm/sm/qOElmtEv7baqN/wDKgav/AEO4DMZLx2TLE4qT21jwUmTE8Vm/bcZtT/5VFGv/AEOrLp9gU37bhNgfv+VbYV/7S4AbK6rPX6N5j2y020emv9LHWfZCzavR3TCtRWzYTbW7/wDKjWL/AGKhRpuH3AWqrrLJebK/vR1BcZGqi/0+YksFvHxjiGLqrntt5uaZjwnqU8vA+GZuu+npv5+WInxiN0SVOkeotuar8W1nvPs+5DckWZPq9XLt/ULVvmR8S+n7VqrrHSX2ij7XTw0jZY0RPF3Vox7U+aonmZCgvYOkGSJ/KsOPLHppWJ9loiJ8d3O1HRnFNfyPPkwz+re0x7a2mY9kbII084mYr9eYbNmVtpbalSqMirIHuSJJF7kejlVWov5W67Ltv2dqTuRHrBoXacvop75jNHFR36Jqv5Y0RkdZt2q1yJ2I9fB3ivYvxThw96lzZTZ34jfZXeuLMzZrpPfnp0XlRV37eZi7NXzavaqqW+J6LRa/SfKXCq8sV6slO3l37LR6J/yI61HhHEOIcN1vyTxi/PN95x5Ozm27az6Y7f6z1JfAB5R7QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACN8r1XuUGTvwjAMXkyG8U7UfVuWVI4KZF27HO+Pam+6oibp2qu6EkEAVGlus2J5tesiwG8UL4bxPLM500jVVzXvV6Ne17VTmRVXtT/AKqh3OB6fR58mSdVasTEfNi8zFZnfvmOvqju73nekOp12nx440dbTFrfPmkRa8V28mJ6t5nvnfaPTsuDK871vxK0SZBX4Xj8lFCiOnbBUSSyQt8Vd2punxVEXby3UkTDchkynE7ZklRSJSOr6Zs7oubdGb/BVROzx8lI+sl81YoqCutWq2GzXO21cL4nVlrSKWRjXIrXNfDG7dzdl72t3T4L4dygrKbKtMJML0uvMdRVUlDFa31lVTz08cSI1GSKqrHuj1ajvZTtRXIvcXdbpKZMMY/g6RMXjfJjmZpyzHfO87bT59pnzKGg1uTHntk+EyWiaTtiyRFcnPE+TG0bxMebeI7580Oz1TNbNeIInqs1pZUdVG38VaODdy+SPVHL5yGWLWta1GtRERE2RE7kQhXSnRCu0yyB+VX/ACK3yMZSyQ8kaOa1iuVvtK923Zsi+HiXhfdb9MLA5Y6jKaeqlTs6uiRaj/MxFan1UsdILfKmfFpeFROTFirFY5Ymevv7vVvKt0ZrPB9Nm1nGbRizZbzaea0R1d0dvZ27QvsEPO4jqC4qrMRwHJLy7uTkgRqOX5cnOv6D5O1J12uy/wDsHSBlIju5LhKvZ58zojlR0d19frorSP1r1r7pnf3OxPSnhtvqJtkn9Sl7e+K7e9MwIZRnFDdu+bHbLzfFGP5f0SHyfp7xDVzuau1WoolXv9HRzU/M2JpKOCY6/W6vFHqtNv4VmPexPSDLb6rRZp9da1/mtE+5NYIIqMGy2iXbIuJRaBU95vpHJ+l0zdvzHQntdgpFX0rinur18eouTnf7ZXG6nAcN/oajm+zjyT/ar36R58f1mm5ftZcUf3MhgY6dbg0X7dxMZU7+RWz/AKlPtFf9M6VNpOInNn7fCed3+sKk56N38i15/wCLJ9yEdK8fl1pH/Ni/EyFBADMw0pYu6a/50q/N8qp+mmO5BmWmU/sx6/Zen84qM/3UqGq3RzUV69r/ALrJ+Ftr0q0turmp+9x/iTmCIKfJcC22j4gb1/8AcqqT/upzvQXrF5F3ouIadrvhPWW1f0OhQrW4Lmr2zMeul/wrdOP4L9kRPqvjn+9KII8ipbxcey068LNv3clLbpf9rEOvcNOdTLgi8ut1fEi/kWmFn6Y3NNUcOwxbbLqK19dcn4G63FM9q74dNe3qti/9iQrjcrfaKOW43StgpKWFOaSaZ6MY1PmqmGtdqBT2jV+rzzFmuSk9Yvma1E5evicu0m6L3c6K5e3u5k8UJUvnDNkt8l9IueqdRc5U7nVlK9yp5Ksrti35+FDLWqvo2TWiRNuxZElZ/o1T2nR35C4ZXJOXVRebxyzHLaI27+2Ov19TwPSj/UXF7YvgNHOOMduaJ5q2tvHZPVPV6uv1sjX3yjdjzslot6ql9DWui6vvlj5OdNvNP9SL8U1g1JzmkmuWM6WQy0Ub1Ykst1bGjl/JRXNTmVPFUTYrOINXS/T6DHdTbzQRRxPkpYKmJ0j4nwuTdGK5zE2cm70RFTuam2/hQaDJsms2F2jFdHsWqL2+kgZHJdKimdT0b3L2vdH1is51c9XLvvypv3qcDS6HDSMta465PnxFb2m1acvXvO8TWN+zq33el1nEM+ScN75bYvmTN8dIrbJzfN2iKzFp27evbbq6571dsmsNU3I6fFM/w6qxetrV5KSWWdJqeof2JypIjUTdVXZNlVN9kVd1QkoxuyjCuILU+sttHlVpoLZS0civZNHPCjY3Ltu9UZI96rsnYidhkexFaxrXPVyoiIrl71+fYVeOaPSaaMVtPanNaJ5q0tzViYnqmJneeuO6ZnbZc6Pa7W6uc1NTW/JWY5LZKRS1omOuJiIiOqe+IjfdyABwHpQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHxqqllLEsjmPeqrs1jG7ue7wRE/8A5ETdV2RFUo9dYqzIfYvlZLBQKnbQUkqs6z+dlbs5yfwW8re1UXnQ248cW67ztHj4R/8AI9LTlyWr1Y6728I9s93vnzRLpXnUmwW2rktNsjq77dI+x1DaoVnfGv8AGOT2I/nzORfkUSSn1iyRrmUqWfCaOVyudyoldW7r3qu20SKvnvv4l92y1Wyy0bLfaLfT0VNH7sMEaMYn0Q7ZcprMOm/6fHEz57/O/wC36PsmLetQvoc+q69TlmI/Np82Pbb6c+uJr6kYQ6A4zWzNq8xvt9yWo33X06tcke/8FrdlRPlzFet+MaY42qJaMZtqyx+NLQ+lTN81a1z0+ql3SRRSpyyxtenwcm5z7jOXi2r1EcubJaY80TtHhHV7mMPBdFpZ5tPirFvPMc0+M9fvW9NfcilTksuF1Dk22bJXVUVNEqeTVfIn1YhT56LVe4orEvuOWZq+NPRy1kjf6UjmNX+qXiDRTVxj66Y67+eY5vdaZj3LF9FOXqyZbTHmieX31iJ96wXabZLX7re9WsmlVe/0DqaJPpyMXY+btDcLq/8A43V368b9/p12mfzefKrSQgb44vra/V35fsxFf5YhXngegt9Zj5/tTN/5plZFJoppZRbdThlE7b/mq+X/AHuUq0OneAU6IkOEWFm3iluh3/Py7lwg05OI6zL9PLafXaZ/q34+FaDD9XgpHqrWP6KXFi2MQftGOWuPb8ijjT/RDuRUFDT/ALRRQR/yI0T/AEQ7AK9suS/0rTPtWq4cdPo1iPYFJyDLMaxSnSqyO90lvjdvyddIiOft+S3vd9EUqxH+qGjlg1MbHWVFTNQ3Wni6mCrZ7TeRFVUa9irsqbuVezZe3v8AAsaCmlyaitdZaa4++Yjef88fUrcSyazFprX0FIvkjsi07RP+euPWoN54ndOKBXR26O53R3cjoadI2L5rIrV/yn2tma5nmMLKmz6KRMpZk5mVV1rGQtci9yoxY+ZyL4Km6EC5johqDhz3yTWd9xo2r2VVAiyt2+LmonM36pt81Kti3EZqDjNPFbq30W7U8CJG1KyNUla1OzbnaqKvm5HKfRr9GdFfTRl4LFctu+bXn+FZrG/r2fK8fS3X49XOHj02w17orjr75vFp29MbpybheZXRVS5Y/p1QMd4ttcla9P6yxp/qfjNG0eq9fe7dTc3f6tx6jplTyVzXqWhb+LKxvhat1xGuhl/GSnnZK36c3Kp2ncV+IInsY3eFX59Un/ccO3DekeOeWmHaPRFZjxmZ/i9FXivRXJWLXz80+mbxPhERHuXfb9GqC3TrNDneaKirv1aXbq2f1Y2NQu+3WKmtqN5K25VDm/jVNdNLv5ortl/MQhXcWtA1NrbhVRKvxnrWs2+iMdudi2aq665snLimn1JRwSd1XVRyIxqfFHvc1rvoi+Ro1PBON5a8+tmKV89rViPdKxpekHR7Df4PQROS3mpS9p98f1TnV0dHX07qSvpYamB+3NFMxHsdsu6bovYvaRvqDr5huFxy0VtqI7zdW+ylNTP3jjX+MkTdE2+Cbr4Kid50odIs3ytqP1Q1IrqmJye1brXtBAvycqNRHJ4e5v8AMvDHdK9PsWRrrPi1E2VndPMzrpd/ij37qn02Ofix8L0Vo+M5JzTHk03iu/ptO0+Ffa6eXLxjiFZ+KY4wRPlX2tfb0UrvH7VvYx7sXEjntPk0N2yGZlRZppOWajipmMaxnisbtubmbvv2uXfuX4plJarrbr5bqe7WmrjqqSqYkkUsa7tc1f8Ar4KneioqKfaopKWrp3UlVTRTQPTldHIxHMVPgqL2FkWq1Qad5dDarWzqceyV0nU06e5R17Wq9Ws/JZIxr15fB0fZtvsbeI6vQ8YjfTYIw3rHZExMWiOue6NrRHXv3x1duzVwvRcQ4Hbl1eonPjvMdcxMWraeqO+29ZnaNu6ZiezdfgAPNvVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANe/S4cS+o+h9i07xnSjN7hjd4vtXXV9ZUUEiMlWmgZGxrHKqL7LnzqvnH8jW1+z04xf3w2X/AN7T7IHotB53bRx+cXdJdaKqrtfstnpoaiOSaJ1UipIxHIrmqnL3Km6HogY9kjGyRuRzXojmqncqL4gcgQDxwcSNLwwcP18zqmqIkyOvT1TjkDtlV9wlavLJyr3tiaj5V8F5OXvchpQ/Z6cYv74bL/72n2QPRaDzpfs9OMX98Nl/97T7JuW6P/J9QL5wj41qNrJmVwvd3vfp13nrblJzPhpEmeyJN9vd6qJH/wBNQMlweebK+kF4tLxlN4u9m10yq3W+uuFRU0lHFUtaymhfI5zImpt2I1qo1E+CHUtnHFxpXi5Ulot3EBmE1XXTx00EaVSbvke5Gtans+KqiAeiQFPx631lpsFstVxuMtwq6Ojhp56uVd31EjGI10jl8VcqKq/NTCPi66VTTTQi5VuAaUW2nzvMqRzoaqVJ+W1W6VOxWSSM9qeRq9ixxqiJ2or2uRWgZ2A892ofSK8ZWqVwckusN3scU7+WCgxlqW1rN+xGMdDtM7tXs5nuX5ld1E0y6SHSrTaPWrUHI9UbRjznRddVTZjO6ppUlcjY3TwtqFmhRznNb7bU2cqIuyqiKG/QHnk096Q/jG05qoprdrffLzBGqc9NkDm3SOVv5KuqEdInm17V+Zst4EekqruKXMWaS5xpslqyltBNX+srRLzW+WOJG86vikd1kK7uRE2dIiqqe6BncUS+YTiOSrz37G7dXSd3WS07VkTyftzJ+c1vdLVxXataQakYLp9pFqJdMYmSy1F3ui26VGLUJPP1UCP7F930aVUT+GvyMDv2enGL++Gy/wDvafZNmLLkw258dpifPE7S15cOPPXky1i0eaY3j3t9VTw/6S1O6riiRuXxjrJ2/o59v0H7TaA6S0qo5uJtkcnjLVzv3+iv2/QaadMdTOlL1mxmbMtLsw1JyOzU9VJRvq6OpiVqTsa1zmIjtlVUR7e5F7yzoekH469Pr9U2q56y3+C42ypfTVlBeLdTTPilY5WvikjmhVzXIqKip2Ki/BS/8tcS25fjF9vt2+9zfkDhPNzfFce/2K/c32WnBMLsT2y2fFLVSSs92WOkYkif09ub9JXTXBwOdKlV6xZpbNHdfLRbLZfrw9tLZ77bmuipqypX3IJ4nKvVyPXsa5q8rnKjeVu6b7HyhlzZM1ubLaZn0zu6OHBi09eTFWKx5oiI/gAw64y+kl0z4XqifBsZoo8y1Aa38JbYqjkpbZum7Vq5U3VHbKipE1OZU95WIrVXVzqb0k/GJqbWzTS6tVuMUcir1dDjLEt0cKL4NlZ+HX+lI5TW2vQWUrI7J68o6eFkqRTUldTVsUipvyuila9U/pNRzfJymhvCNO+kc1S03r9a8UyPVO441RQy1XrCXLqiOWqjj36x9PHJOks6N5XdrGrurVRN1TYtLTzj94vtNa6GrtGumSXSKJyc1Jf6lbrDI38lUqedzU/kq1U8FQnjyWxXi9e2GvLjrmpOO/ZL0TAxA4EekExvi1oqjEMntdLjmodqp/SaighkVaW4wIqI6el5lVycqqnNE5XK1FRUc5N+XL8g2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANHXTCZ991fFouKwzo6DDMfoba5iLujZ5uaqevmrKiJF/koYOvY6Nyse1WuauyoqbKi/AnjVSqqOJbjZvsFDI+Vuc5+trontXdUppKxKeBd/lEjO3u7CgcXGL02GcUGquN0NM2npKXLbm6mhamzY4ZKh8kbU+SMe1E+SARKen3Se8fdFpZhuQc/N6zx+3VnN8espo37/AOY8wRuY1P4tfvG9GRplcbHc+qzLMMOt+N2NWv2lhdHSshqatPH8ExvYvhI+L4qBhV0nvE59/wD4gKnGcduHX4fp+stntvVv3jqavmT0upTwXme1I2qnYrImqnvKYeE16KaPre9LdUte8lpv/dzArQlFSLInZV3uvc2mpWN371i65ahdu5Y49+xxCgHOGGWomZTwRukllcjGMam6ucq7IiJ4ruegTX6WLhn6PK/2WmkZTy41gMGMwPavalTNBHQtei+Lusl5t/j2ml3g2wFNTeKfTDDpIeugqcjpaqqj2356amd6TMn1jhebQemfz77n+HHHcFp5uWfLMlidI3f36WlifI/s+Ur6dQNLJPnAZgH3yeL3S/HXwddBT3yO71DVT2eqomuqlR3yXqEb8+bbxIDNhvQr4Cl819y7UGeHngxbHPRo3be5U1kzUYu/81BUJ9QMmulY4yrnorh9Lodptdn0eX5hSOnuVdTycs1ttaqrPYVO1kszke1HJ2tax6psqtcmlhVVV3Vd1UmTjE1Vq9Z+JnULPJql01NUXqejt+7t0bQ0y9RTongm8cbXLt4uVfHchsDPjoheHSg1S1ruOrmUW5lVZdOYopaOOVu7JLtMruodsvY7qmMkk+T+qU2SdIjPT0/BZqrJUsa5i2iNiI7u53VULWr5o5UUsboodN4sC4PLBeJKdI63M6+tv1Qqt9pWrJ1EO6/BYqeNyfy1+KmQ+u+jGMcQmlV80gzK5Xahs2QJTpVT2qaOKqRIaiOdqMdJHI1N3RNRd2ru1VTs33A8ypsw6EPB/TdRNStSJYOy0WajssMip41UyyvRPmiUbN/5SfEnz/gscK37t9Uv8Vt//wCkZEcOXC/pNwXYHkluwa7X2pttbO69XKsvdRDNMxsUKJsixRRNRjWscqIqKu7ndvciBpu6TLPvu+4zs+lim56WwS09gp0335PRoWNlT+3WZfqYuFczvK6zO84yHN7jv6XkN1q7rPuu69ZPM6V26+b1KbaqH1pc6O2elU9L6XPHB19RIkcUXM5G873LsjWpvuqr2IiKoHoF6N7T/wC95waadUUsPJVXqikv9Qqpsr/TJXTRL/YuhT6GnrpD6m11XGlqrLZ2sbA28RxvRm23XspoWzL2ePWtk3+e5t11G44+FTh00YjbierGJZfVWC0xW2yWTH7xT181VJFEkcLHdQ5yRM9lOZ7tkRqLtuuzV0LZdlN5zjKrzmmR1S1N1v1fUXOum/5k80jpJHfVzlA5YXU3SizGxVljc9txgudLLRqzfmSdsrVZtt48yIb8ekJ4qn8LOhk90x6eJMzymR9qx5jtlWF/LvNV8q96QsVFTfs53xIqKiqa0OjI4Pcn1s1fs2rmSWWaDT/C65lwdVTxq2O5V8LkdDTRbptIjZEa+RU3RGt5V7XodnpgNT6rM+Kt2CsqXOoMCs9LQMiRfZSpqGJVTPT5q2WBq/zSfADCS5XK4Xi4VV3u1dPW11bM+oqamokWSWaV7lc973L2ucqqqqq9qqpMvBnw/ScS/ELjOmVQ2VLM6R1xvssaq10dug2dKiOT3Vf7MTV8HStUhI2z9CPpbHT45qHrRV0281bVwY1QSqmytjiYk9QifFHOlpvrGBs0tNmtNhtFJj9mt1PRW2gp2UlLSQRoyKGFjUayNrU7EajURET4IeXTIYaamv8Ac6ejajaeKsmZEidyMR6o39Gx6eNQcmiwvAslzGd7WRWGz1lze53cjYIXyKq/Rp5d3Oc5yucqqqruqr3qoEhcPmq100Q1qw3VO1VD4n4/doKioRjlTraVXctREu3g+F0jF+Tj0yRyRyxtlie17Hojmuau6Ki9yop5WT1I4hBU02J2WmrN/SIrdTMl3TZedImo7f67gVcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALA4gc9TS7Q3PtQ0m6uXH8dr66nXfZVqGQO6lqfNZORE+al/mGHS3Z99xvB3dbJFP1c+Y3m32Vmy+0rEetVJt8lbSq1fk7bxA1tdFrgX3ecZ2IVE8Sy0uMQVuQVCbb7dVCrInfLaeaFfoU/pObCtg43dR42s5Yq6S318a/ldbb6dzl/r86fQyi6EHAetvWp2qNRDt6NS0NgpJNve6175527/LqqdfqRD0yFiW08XFLckZsl6xK31nN8VbLUQf6Qp+gDBcv+65hqLrbLp9pnFHNcZLBRQ4vjdtgRVVyzVL3oiJ3LI+SbZV+DWJ3NQsA2V9Drwv/dPl9x4l8tt3NbMae+2Y42VnszXBzNpqhEXvSKN3Ki93PKqpssYFT4/tPrNwmcCWl3DTZJoXXG+X31nfKqPs9PqIIFfVSfFW9dPTo3fuZHGngawTYR00mfevuITFsBgm54MVxts0jd/cqauZznpt/NRU6/U17gZ79DTgP3ScTt1zWeHmp8Qxuoljftvy1VS9kDE+W8Tqj8xXumtz71zrjhWncE3PDjOOvrpGovYyorJ1Rzdvj1dNCvk5Cc+hMwH1Vo/nupM0HLLkV/htcTlTtdDRwc+6fLnq3p5s+Rr76QLPvvjcYmp97jn62ChvLrLBsu7UZQsbSry/JXQud81cq+IGPZuT6HTC5sU4Y831K6jlq8jvc6U7tvfp6KnRI1+f4WSoT6Gmw9F/Axp83TnhD0wxWemSOWawRXOqjc3t62tV1U9rvmizq1fLYDzoyPfK90kj1c96q5zlXdVVe9T8Lx1k09uOk2q+Xaa3SB8VRjd5qrds78eOORUjenxa5nK5F8UcilnAemTh1xePCtAdN8Tjj5PVOKWqlenxkbSxo9V+au5lX5qdLWbid0I4fKm1UesWodJjc96jlloY5aaomdMyJWo9doY38qIr2+9tvv2b7LtIOPpTJYbalG5rqdKOFIlb3KzkTl2+W2xol6UzW2i1i4q7tb7HXNqrNgtLHjVNJG5FZJPG5z6p6beKTSPj38UiQDaj/wASjgi/+fVt/wALuH/oH7xh64Y3DwK55qxhd6SrteSY0tHaaxsb4lnbcHNpWSMa9GvTsnVyboi7Juefa30FXda+mtlBC6aqrJmQQxt73yPcjWtTzVUQ249LJX0ukfCJpVoFapmMbLV0dGjW9iSUlrokjVET4dZLTr9EA1DkqcMeg124lNY7TpJZ6/0Ca501dULVqznbD1FLLK3mTdOxz2MZv4c+5FZsd6E3AfW2seeakTQc8WOY/DbInKnY2asn5kVPnyUkieTl+IGuito6q3Vk9vrqd8FTSyuhmiemzo3tVUc1U8FRUVCXOECu0wo+JHBItY8Yt9+xKvujLfX01fzdRGs6LFFM9EVEc2OR7HuR27Va126F+dJLpH96Hi7zSjpaXqbZlErMot+zeVFZV7um2TuREqG1DU28GoYwoqtVHNVUVO1FTwA9TtqtVrsVtprPZLbS2+go42w01LSwtihhjamyMYxqI1rUTuRE2PO7x6Vs1w4xtWZ53Oc5uRzwIq/kxtbG1PzNQ3c8EmuCcQXDRhmf1dWk94ZRpa72qru71hTfg5XO+CybNlRPhKhpw6TbBa7BuM/PPSYHMpsgfS32ieqbJLFPAzncnlMyZv8AQUDFo399F5iMeJ8FOCP6tG1F7dX3eoVE95ZauVGL/ZMiT6GgQ9GXAqtOvB9pItM5FZ9y9Ii7fl7Lzf5twLS6S/UqLTXg3zqRs/V1mTRRY1Rt326x1U/lmb/d21C/0Tz9Gx7pmOICly7UfHtAsfrmzUeGRuuV56t+7VuU7ESOJf4UUPb/APkORe1DXCBI/DfpvUau694DpxBAsrL5fqSCpTbflpWyI+od5NhbI76HphNUHQ1cM1a+53bigym3OjpYYpbLi/WN262Ry7VdU3x2a1Opaqdiq+ZPxTa+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADU/wBN/n3WXfTDS6nm29Hpq6/1ce/f1jmQQLt8uqqPzm2AAYX9EhgH3G8HlqvksHV1GY3m4Xp+6e0rGvSlj3+StpUcnydv4mKnTfWP0fUzTHJeTb0+xVtDzfHqKhr9vp6T+k29gDzBaU6aZPrFqNj2mGHUvX3fI66Ohp0VF5Y+Zd3yv27mMYjnuXwa1VPSVo3pVjGiOmGOaVYfByWvHKFlJG9Wojp5Pelmft+PJIr3u+blLzAHnO468+++Vxdao5KyfroI79Laqd6Lu1YqJraRit+SpBv9d/Egg9VAAxY4IbPQ6C8A2I367w9UylxmrzGvV3sq5kyS1qKvw2hcxvk1DQVe7vXZBea+/XOXray5VUtZUP8AypZHq9y/VVU9TgA8vOnGH1eoWoWMYFQ83pGSXiitMXKm6o+omZEip9Xnp+t9BSWugprZQQthpqSFkEMbe5kbGo1rU+SIiIdgAYF9Ih0dE/EjWJq/pBLR0ef09M2nr6CpekUF6ijTaNesXsjna1Eajney5qNRyt5UU096j6Oaq6Q3V9m1O0+v2NVTHqxEuFE+KORfjHIqckjfg5iqi+Cnp4PlVUtLWwPpayminhkTlfHKxHtcnwVF7FA0J0fSicVdu0XpNGLbe7LSw0VA21xZDHRyJeG0rWcjWJMsnVo5GIjesSPrOxF5ub2jGXF8JzjUG6erMLxO+ZHcZXftFsoZauZzlX8mNrl7T0vu0l0qfMtS/TPFHSqu6yLZaZXb+fJuXJQW632umbR2yhp6OnZ7sUETY2J5NaiIBpz4Nei316qdSMR1U1httDh+P49d6O8La66RJbhXpBK2VsXUxqqRNcrER3WOa5EX3FOn00mfevuIXF8Bgm54MVxts0rd/cqauZ73pt/NRU6/U3QADyrm67oZsB+5zhmvGbTw8s+XZJUSRv225qWmjZCxPntKlR+cz6AGs7pr9I/WmB4Prbb6Xeaw10tguL2p2rT1Leshc7+CySJ7fOc1EHqoAGoPoWdcfUee5XoDdqvlpcmp/XtoY5exK2najZ2NT8p8HK5flTGYHSF8DsfFphtBfsOqKWg1BxeORttkqF5IbhTOXmdSSv8Axfa9qN69jXK5F2R6uTLwAeYzU3RXVrRq7y2TVHT2+Y3VRPViLXUjmwyr8YpU3jlb8HMc5F+JkNof0m2veguiDdFMUtmPVcNB17LPdq+CSSpt0cr3Pc1rUcjJOV73OZzoqJvsqOaiNTfTUU9PVwvpqqCOaGROV8cjUc1yfBUXsUtibSbSuplWeo0zxSWVV3V77NTOdv5qwDzPObmmpOU1VY2C7ZLkN5qZKqodFFJVVVVPI5XPeqNRXOcrlVV+ambfCT0UerOqV6ocq16tdbg2GQvbNJQVCdXdri1Nl6tsS9tM1e5XyIjk/FYu/Mm6K02Gx2CBaaxWaht0K7bx0lOyFq/RqIh3wKXi+L49hWOW3EcTtFNa7NZ6aOjoaKmZyxwQsTZrWp8kTv71717SqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4V1bR22iqLjcKmOnpaWJ8880jkayONqKrnOVe5ERFVV+R9yCuLW93ysxC0aQ4ljldkF31DuCUFXbqGohgmfY4dpbo5JJnsjYjoESn3c5NnVTNt17AJcw3McZ1BxW1Zvhl3huljvVKysoKyFHI2aF6bo7ZyI5F+KKiKioqKiKmxWTHrhpvmQ49mudaSZTgFfhcMtW7McYtdZVUs/Lb6yRfTI43UskkSNjruufy7orW1cSbbbKuQoFHxvLcdy+21F3xy5sraOlrq22TStY5qMqaSokp6iPZyIvsTQyM37l5d0VUVFXnimUWHN8YtOZYtcW19mvtFDcbfVNY5iT08zEfG9GuRHJu1yLsqIvb2ohjrp/rNp1oTjucafamZHT2fKKLL8nulDZZ90rrzTXC51NbSPoIPfq+sjqWM2hR6pIjmLsrVQlvhzxO9YHw/aa4TkdN6PdrDiVpt1fDui9VURUkbJGbp2Ls5FT6AXDnef41pvZo79lT7m2jlqG0rVt9orLlJ1jmucm8VLFJIjdmL7St5UXZFXdURaJpfrnprrLHLUad3S6XCnihZUekVFhuFDBJG5VRro5amCNknai9jFVS/iIOENrm8M2nDXNVFSxQdip5gS+RhlXEvolhd9rsdv+a8tXaVRt0fSW2rrKe2KrebasqIInw0q8qo5UmezZFRV7FQk8xg0X1o0m0O06bphq/lFDima2SqrvW9vuTXMq73VSVMkj66kj2V9c2p5+tRYUkdu/kVEc1WoGS9BX0N1oae52utgrKOsiZPT1EEiSRTRPRHNexzVVHNVFRUVF2VFOrkuRWXEMduuW5JXsobTZKKe419U9rnNgpoY1klkVGoqqjWNcuyIq9nYhHXC9jt5xnRq20N5stTZG1Nxu9yt1nqWck1qttVcaiooqN7fxHRU0sLFZ+Jy8n4p8OLdXS8OGd2tqKq3u3JY9k73enSspdvr1+31Au+76uacWHTB2s91yykgwptsivHrjZ7olo5GtdHIjWor3cyPbs1Gq5Vcibb9hdNJVU9dSw11JK2WCojbLFI3uexyboqeaKhhxdtLcnyXILpwh1OO1aaf4/V3DNKWtWJfRam3Ttc+22tHdyuhuUtQ5GeEVvg7uZEMi+He+OybQHTXInqqvuWI2eqfzd6PfRxOci/NFVUAvLIMhsWKWStyTJ7xR2q1W2F1RV1tZM2GGCJve973KiNRPipZOFcQukOoF/hxbG8plS7VcT6ijpLja6y2yV0TERXvpkqoo/SWtRd1WLmRE7V7Ci8TlurKjEsavy2SsvVlxjLbXfL/baSmdUy1Fvgc/me2BqK6bqZXQVKsaiuVKdeVFdsi2Tqbqxpnr1LhWF6K5Tbswyemy+yXxtXZn+ktx+lpKyOasqKqRvs06upWz06RSK18i1HIjVRXbBksRxqVxCaV6RXGK15/dbzQSztgdHJBjdzrYHLNL1UTOup6eSPnfJsxGc3Mquam3tJvI5D3FU1z9MLUjWqq/d7hC9if/AFLbQJHw/MLHndgp8nxx1e6gqnPbGtbbamgmVWOVrt4amOOVva1dlVqbp2pui7n0yrKrBhOPV2V5TcW0FqtsfXVVS5jnpGzdE32aiuXtVO5FKsRDxcNc7hvzxrWqqrbU7ET+NYBLxR67LsdtmT2nDa+5NgvF8p6qpt1M6N//AIiOm6vruV+3JzNSaNeVVRyoqqiKjXKlYIn4kbJdHYPSaj4zRSVORabXGPKrfDCn4Wqiha5lbSN8VWejkqYkTu53sXt2QCQIsuxyfLqjBIbm199pLdDdaijax6rFSyySRxSOdtypzPilRqKu69W5UTZFUrBDnDXBNk1lv2ulyp5Y6zVC4+t6JszFZJDZImJDa4lauyt5qdqVCt8JKqQmMCJE4qtFZLjU2uku+SVstJX1FslkosNvVTB6TBM6GVjZ4qR0TuWVj2KrXKm7V7ewlswh0I1dwHDpay3ZTxm49jXoWd5V6ThFa+0RPjR1/rlSJz5G+kt6xHJJvzb7SJtsmxm8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABxVjHOR6tRXN7lVO1DkAAAAA/Fa1VRytRVb3Kqdx+gAAAAAAH4jWt3VrUTmXddk71P0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOCyxN96RqeaoNjfZzB8Vq6VvvVMSeb0OK3G3t96up085W/rJRS09kIzesdsuwDqLd7U33rnSJ5zN/WcFvtkb714oU86hn6zMYrz2VnwRnNjjttHi7wKcuRY+33r7bk86pn6zguUYy33sitiedXH+sl8BlnyZ8JRnUYY8uPGFUBSVy7FG+9k9pTzrYvtHBc0w5vvZZZk86+L7RL4tnnyJ8JRnV6eO28eMKyChrnWEt97MbGnncIftHBc/wNvvZtYU87lD9ozGk1E9mO3hKM67Sx25K+Mfer4LeXUXT5vfnePJ53SD7R+ffH08/d5jv+KQfaJfEtT+jt4Sx8oaT9LX9qPvXEC3fvj6efu8x3/FIPtH0ps+wWsqIqOjzWwzzzvbHFFHcoXPke5dka1EduqqqoiIhidFqYjecdvCSNfpJnaMtf2o+9XgQLxCZpn+M5hj9HHluRYRgc1uqprjk9hxuO8TRXFskaQwVCPhnbS06xrI5ZVi2VURvWR7e12M41KyTHuETK9Uca1JsWV3q0Ytc7jbsltNJElJVSwslWGVIueWPmTlaj03Vqva/wBlqewlZbTkCEuJTOdW8PuGmtBo82gqbnfclqYau21jG8l0pKa011a+jbI5PwMki0rWskTblerVdu3mRedk1wZnmpGl7cKubvuZy7Hskra+knpmsqIqyhmt0bYZkcnPDLC+eojfHumzt0XflTYJqBCE1y1V1hz3L7NhWo78BxjB7jHYnVNBa6WtuF0uPosFTM5XVbJIoaeNtRFGjUjV73JIvM1Ebv8AuveU6gaTcOVTe5tQV+6OhrrLQ1OR0dkj50iqbtS080zKNyTMWTqJnpyo1yK/ta1N0agTcCFdA71U5RdLndKfX7Mc6oqGBsEtDe8Sp7PHDLI7dkrHJQ08kjkSN7dkc5qI72k35VJqAAgGoyDVjBtZ8GxS66r0uY1GY1dc6641DY4KWK02uOnmkbXwPZzTRxxzNp4F9IkkSV0+zeVybJXMvv2o+far3DSXTzMG4bb8Zs9Fdr7fIrfDWV00tbJUMpqWlZUI6GNGtpZZJJHxye9E1qJ7SoExAiTTfJ8/sGpl10X1IyGnyaaOzRZDZL9HRMpJ6mkWdYZoKqKP8GkscnVqj42ta9kiey1WLzW9jdRrPrpHds5xrVt+A47Dd7jarBb6Cx0dbLVMoqqWlfVVslU16qkksMjmxQ9UrY+Td6uV2wT4CE7Rr5dbNoZnGoeeWamnyDTWW62680trVWU9fV0SbsdT86qsbJ2uhciPVVYsitVV5d1pmQWbiewzDK7VGr1htl4vVpopLtXYj6hpobLMyNiyS0lPUInpjH8qOayeSV6K5GudHsqtAn8Fv23O8Yr8Rs2a1N2prbbL5SU9ZSyV0zIN2zRJIxqq5dublXfbfwX4HH74+nn7vMd/xSD7Rvx6bPljmpSZj0RMq+TV6fDblyXiJ80zELiBbv3x9PP3eY7/AIpB9offG09/d5jv+KQfaJ/EtT+jt4T9yHyhpP0tf2o+9cQLfTULAXe7nGPr5XOH7RzTPMGd7uZ2JfK4w/aMfE9RH+3bwlmNdpZ7Mtf2o+9XQUVM2wx3u5dZV8q+L7RyTMMRd7uU2hfKui+0R+K548ifCUo1mnnsyV8YVgFKTK8Xd7uSWpfKsj/Wc0yXHHe7f7avlVx/rI/AZY8mfCUo1OGey8eMKkDoJf7E73b1QL5VLP1nNLzZ3e7daNfKdv6zHwWSPJnwZjNinstHi7gOql0tjvduNMvlM39ZzSuone7WQL5SIR5LR3JRkpPZMPuD5pUU7vdnjXychzRzXe65F8lMbTCUTE9j9ABhkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADiscbveY1fNDkAPktLSu96miXzYhxSiomuR6UkKOau6Kkabop9wS5redHkr5lg6hYlqtdrtSXzTDVekxp8VM6lqbdd7A2626o3du2ZGMmp52TN3VN0m5FTZFYu25bUnDtHNw/5jopPmU01fnEF4fdL66gY3etuLpHzTspmOa1rEdIvLGju5qIrlVVcsxgiktDMtP25dl2BZUt2WlXB7zVXdIOo5/S+uttXRdXzcydXt6X1nNs7fq+XZObmS0aTh1stq4ho9erFf6mgZNa6+lr7A2FFpaiuqlpUfXsXmTqpXR0kTJERqpJyRuXZzXK+XQBE+RaRZzb81u+eaM6k0OLVeTLDJfrbeLEt2ttZUxRNhZVsjZUU8sNR1LI43ObKrHtij5mbt5js6gaUZdn+jaad3DUaFckbV224/dDPZWvidU0dwhrWKtHHLGnVqsDY+VJUVGrurnLuqyeALBwLH9cLVeJajUnVDEcjtjqdzI6W04dPapmT8zVbIs0lwqEc1Go9FZyIqq5F5k22W/Ho9WOSNyNcqLyqqboi+XicgBAejug+tGmmXXDJ8k1pxPK5cgrVq8grJcGnprpcGIjkhgbU+s3xwRRIqNjjbDyNai7N5nOct4Z7pRkdzzKLU3S/OosTyv1ey01zqy1+srddaKN75IY6mnSWF6uifLKsckcrHNSWRF5kdskmACO9NtKrpiuQXfPs6zN+WZjfKeChnr20LaGkpKKFz3R0tJTI96xR88j3uV0kj3udu5yo1rW29NozqZil1vK6L6u2/GbFkFfUXSptF3xr1syhrKh6yVMtC9tTAsKSyudK6OVJmJI97kREdykygCwMb0Uw6yaXXLSi6elZBbb/AB1yX6puT0dUXaatV61c0zmI1OaRZHdjUajU5WtRqNREsis0H1evuPu00yniEluOCSw+hVTGY82HIK6h25XU09ySdY1RzPYfLHSslciu2c1y8xOwA61PbbfSUNPbKaigjpKSNkUEKMTkjY1OVrWp3IiJ2Ic0o6Rvu0sKeTEPsDMWmOqJRmsT1zDgkELfdhYnk1DkiInYibH6DG+7MREAADIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/2Q=='; // Truncated for brevity

; // Example base64 string

    // Function to generate the PDF report
    const generateReport = () => {
        const doc = new jsPDF();

        // Add the logo
        doc.addImage(logoBase64, 'PNG', 14, 10, 40, 30); // Adjust the position and size as needed

        // Title
        doc.setFontSize(24);
        doc.setTextColor(40, 114, 178);
        doc.text('Microservice Center', 14, 50); // Adjusted Y position to account for logo

        // Contact Information
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        const date = new Date().toLocaleDateString();
        doc.text(`Date: ${date}`, 160, 50);
        doc.text('72/A, Makumbura, Pannipitiya', 14, 58);
        doc.text('+94 112203203', 14, 64);
        doc.text('microservicecenter@gmail.com', 14, 70);

        // Line Separator
        doc.setLineWidth(0.8);
        doc.line(14, 75, 196, 75);

        // Table Header
        const headers = ['Inventory ID', 'Item Name', 'Quantity', 'Supplier', 'Reorder Level', 'Date Added', 'Status'];
        const columnWidths = [30, 50, 20, 40, 25, 30, 20];
        const headerHeight = 10;
        const startY = 85; // Adjusted start position for table

        // Header row
        headers.forEach((header, index) => {
            const xPosition = 14 + columnWidths.slice(0, index).reduce((a, b) => a + b, 0);
            doc.text(header, xPosition, startY);
        });

        // Table Rows
        rows.forEach((row, rowIndex) => {
            const y = startY + headerHeight + (rowIndex + 1) * 10;
            let xPosition = 14;

            // Use conditional checks to avoid accessing undefined
            doc.text(row.itemId ? row.itemId : '', xPosition, y);
            xPosition += columnWidths[0];
            doc.text(row.itemName ? row.itemName : '', xPosition, y);
            xPosition += columnWidths[1];
            doc.text(row.quantity !== undefined ? row.quantity.toString() : '0', xPosition, y);
            xPosition += columnWidths[2];
            doc.text(row.supplier ? row.supplier : '', xPosition, y);
            xPosition += columnWidths[3];
            doc.text(row.reorderLevel !== undefined ? row.reorderLevel.toString() : '0', xPosition, y);
            xPosition += columnWidths[4];
            doc.text(row.dateAdded ? new Date(row.dateAdded).toLocaleDateString() : '', xPosition, y);
            xPosition += columnWidths[5];
            doc.text(row.status ? row.status : '', xPosition, y);
        });

        // Save the PDF
        doc.save('inventory_report.pdf');
    };

    // Filter rows based on the search term
    const filteredRows = rows.filter(row =>
        row.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.itemId.toString().includes(searchTerm) ||
        row.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search Inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <button className="generate-report" onClick={generateReport}>Generate Report</button>
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>Inventory ID</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Supplier</th>
                        <th>Reorder Level</th>
                        <th>Date Added</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRows.length > 0 ? (
                        filteredRows.map((row) => (
                            <tr key={row._id}>
                                <td>{row.itemId}</td>
                                <td>{row.itemName}</td>
                                <td>{row.quantity}</td>
                                <td>{row.supplier}</td>
                                <td>{row.reorderLevel}</td>
                                <td>{new Date(row.dateAdded).toLocaleDateString()}</td>
                                <td>{row.status}</td>
                                <td>
                                    <button className="edit" onClick={() => onEditInventory(row)}>Edit</button>
                                    <button className="delete" onClick={() => onDeleteInventory(row._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No inventory items found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryTable;
